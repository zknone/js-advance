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
import type { StoreListener } from '../../types/core';
import { PAGE, type MainPageProps } from '../../types/pages';
import type { IStore } from '../../types/store';
import getDataFromInputs from '../../utils/getDataFromInputs';
import { validateInput } from '../../utils/validation';

const insideFormClassName = 'custom-form';

class MainPage extends TemplatePage<MainPageProps> {
  unsubscribe: StoreListener;

  constructor(props: MainPageProps) {
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
      query: props.query,
    });

    this.unsubscribe = store.subscribe((state: IStore) => {
      const { user } = state;
      const chats = state.chats ?? [];
      const messages = state.messages ?? {};

      const { query } = state;
      const digitId = query?.id ?? null;

      const messageList = digitId ? messages[Number(digitId)] : {};
      if (!user) return;

      if (digitId) {
        const stringId = digitId.toString();
        this.setProps({
          ...this.props,
          chatList: chats,
          makeNewChat: !chats?.length,
          messageList,
          query: { id: stringId },
        });
      } else {
        this.setProps({
          ...this.props,
          chatList: chats,
          makeNewChat: true,
          messageList,
        });
      }
    });
  }

  async componentDidMount(): Promise<void> {
    if (!store.getState().chats) {
      await chatController.getChats();
    }

    const { user, chats, query } = store.getState();
    const { id: userId } = user!;

    const activeChat = query?.id ?? null;

    if (chats && activeChat && !socketOrchestration.isConnected(Number(activeChat)) && userId) {
      const { token } = await chatController.getChatToken(Number(activeChat));
      socketOrchestration.addNewSocket({
        userId,
        chatId: Number(activeChat),
        token,
      });
    }
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

    const chatList = Array.isArray(this.props.chatList) ? this.props.chatList : [];

    this.children.chatList = new ChatList({
      ...this.props,
      chatList,
      settings: { withInternalID: true },
    });

    const queryId = store.getState()?.query?.id;

    const exactChat = chatList.find(
      (item) => item?.id.toString() === (queryId != null ? queryId.toString() : '')
    );

    this.children.chatMenu = new ChatMenu({
      ...this.props.chatMenu,
      chat: exactChat!,
      modalOpen: null,
    });

    if (messageList.length) {
      this.children.messageList = new MessageList({
        ...this.props,
        messageList,
        settings: { withInternalID: true },
      });
    }

    this.children.messageQuill = new MessageQuill({
      ...this.props.messageQuill,
      settings: { withInternalID: true },
      events: {
        submit: {
          handler: (e: Event) => {
            e.preventDefault();
            const { message } = getDataFromInputs('message-quill__form');
            const isValidated = validateInput(message, 'message');

            const { id: chatId } = this.props.query;

            if (isValidated && chatId) {
              this.setProps({
                ...this.props,
                messageQuill: {
                  ...this.props.messageQuill,
                  value: null,
                },
              });

              socketOrchestration.sendMessage(Number.parseInt(chatId, 10), message);
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
