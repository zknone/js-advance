import ChatList from '../../components/chatList/ChatList';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import CustomForm from '../../components/customForm/CustomForm';
import CustomLink from '../../components/customLink/CustomLink';
import MessageList from '../../components/messageList/MessageList';
import MessageQuill from '../../components/messageQuill/MessageQuill';
import Search from '../../components/search/Search';
import { ROUTES } from '../../consts/routes';
import chatController from '../../controllers/chat/chatController';
import router from '../../core/routerEngine/router';
import socketOrchestration from '../../core/socket/socketOrchestration';
import store from '../../core/store/store';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { mainPageData } from '../../mocks/chat';
import { PAGE, type MainPageProps, type WithPage } from '../../types/pages';
import type { IStore } from '../../types/store';
import getDataFromInputs from '../../utils/getDataFromInputs';
import { validateInput } from '../../utils/validation';

const insideFormClassName = 'custom-form';

class MainPage extends TemplatePage<MainPageProps> {
  subscribe: any;

  constructor() {
    super({
      page: PAGE.MAIN,
      settings: {
        withInternalID: true,
      },
      tagName: 'section',
      tagClassName: 'main-page',
      customLink: mainPageData.customLink,
      search: mainPageData.search,
      chatMenu: mainPageData.chatMenu,
      chatList: [],
      messageList: {},
      messageQuill: mainPageData.messageQuill,
      query: { id: null },
    });

    this.subscribe = store.subscribe((state: IStore) => {
      const user = state?.user;
      const chats = state?.chats;
      const messages = state?.messages;
      const id = state?.activeChat;
      if (!user) return;

      this.setProps({
        ...this.props,
        chatList: chats ?? [],
        makeNewChat: chats?.length ? Boolean(chats?.length) !== Boolean(id) : true,
        messageList: id ? messages[id] : {},
      });
    });
  }

  async componentDidMount(): Promise<void> {
    if (!store.getState().chats) {
      await chatController.getChats();
    }

    const { user } = store.getState();
    const { id: userId } = user!;
    const { activeChat } = store.getState();

    if (activeChat && !socketOrchestration.isConnected(activeChat) && userId) {
      const { token } = await chatController.getChatToken(activeChat);
      socketOrchestration.addNewSocket({
        userId,
        chatId: activeChat,
        token,
      });
    }
  }

  componentDidUpdate(
    oldProps: WithPage<MainPageProps>,
    newProps: WithPage<MainPageProps>
  ): boolean {
    const oldId = oldProps.query?.id;
    const newId = newProps.query?.id;
    if (!oldId || !newId) {
      return true;
    }
    if (oldId !== newId) {
      return true;
    }
    return false;
  }

  protected gatherChildren() {
    const messageList = Object.values(this.props.messageList ?? {}) ?? {};

    this.children.customLink = new CustomLink({
      ...this.props.customLink,
      settings: { withInternalID: true },
    });

    this.children.search = new Search({
      ...this.props.search,
      settings: { withInternalID: true },
    });

    this.children.chatList = new ChatList({
      ...this.props,
      chatList: this.props.chatList ?? [],
      settings: { withInternalID: true },
    });

    const chatList = Array.isArray(this.props.chatList) ? this.props.chatList : [];

    const exactChat = chatList.find((item) => item?.id.toString() === this.props?.query?.id);

    this.children.chatMenu = new ChatMenu({
      ...this.props.chatMenu,
      chat: exactChat!,
      modalOpen: null,
    });

    this.children.messageList = new MessageList({
      ...this.props,
      messageList,
      settings: { withInternalID: true },
    });

    this.children.messageQuill = new MessageQuill({
      ...this.props.messageQuill,
      settings: { withInternalID: true },
      events: {
        submit: {
          handler: (e: Event) => {
            e.preventDefault();
            const { message } = getDataFromInputs('message-quill__form');
            const isValidated = validateInput(message, 'message');

            if (isValidated && this.props.query.id) {
              this.setProps({
                ...this.props,
                messageQuill: {
                  ...this.props.messageQuill,
                  value: null,
                },
              });

              socketOrchestration.sendMessage(Number.parseInt(this.props.query.id, 10), message);
            } else if (this.props.chosenChat) {
              throw new Error('Ошибка определения чата');
            } else {
              throw new Error('Пустое или невалидное поле сообщения');
            }
          },
        },
      },
    });

    this.children.customForm = new CustomForm({
      title: 'Создание чата',
      customLink: {
        text: 'Назад',
        href: '',
      },
      customButton: {
        text: 'Создать',
        type: 'submit',
      },
      inputFields: [
        {
          value: '',
          title: 'Создайте чат',
          type: 'text',
          placeholder: 'Введите название нового чата',
          error: null,
          name: 'title',
          variant: 'regular',
        },
      ],
      events: {
        submit: {
          handler: async (e: Event) => {
            e.preventDefault();
            const data = getDataFromInputs(insideFormClassName);
            const { id: chatId } = await chatController.createNewChat(data.title);
            store.set('activeChat', chatId);
            router.go({
              pathname: ROUTES.messenger,
              query: { id: chatId.toString() },
            });
          },
        },
      },
      settings: { withInternalID: true },
    });
  }
}

export default MainPage;
