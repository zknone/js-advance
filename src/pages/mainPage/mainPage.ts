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
import store from '../../core/store/store';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { mainPageData } from '../../mocks/chat';
import { PAGE, type MainPageProps } from '../../types/pages';
import type { IStore } from '../../types/store';
import getDataFromInputs from '../../utils/getDataFromInputs';

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
      messageList: [],
      messageQuill: mainPageData.messageQuill,
      chosenChat: null,
      query: { id: null },
    });

    this.subscribe = store.subscribe((state: IStore) => {
      const user = state?.user;
      const chats = state?.chats;
      if (!user) return;

      this.setProps({
        ...this.props,
        chatList: chats ?? [],
        makeNewChat: !chats?.length,
      });
    });
  }

  async componentDidMount(): Promise<void> {
    if (!store.getState().chats) {
      await chatController.getChats();
    }

    const chosenChatId = this.props.query?.id ?? null;

    if (chosenChatId) {
      this.setProps({
        ...this.props,
        chosenChat: chosenChatId,
      });
    }

    // токен пересоздаем только если не устанавливали соединенение

    const openedChatId = this.props.chosenChat;

    if (openedChatId) {
      const token = await chatController.getChatToken(openedChatId);
      console.log('Токен', token);
    }
  }

  protected gatherChildren() {
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

    this.children.chatMenu = new ChatMenu();

    this.children.messageList = new MessageList({
      ...this.props,
      messageList: this.props.messageList,
      settings: { withInternalID: true },
    });

    this.children.messageQuill = new MessageQuill({
      ...this.props.messageQuill,
      settings: { withInternalID: true },
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
          title: 'Создайте свой первый чат',
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
            const chosenChat = await chatController.createNewChat(data.title);
            router.go({
              pathname: ROUTES.messenger,
              query: { id: chosenChat.toString() },
            });
          },
        },
      },
      settings: { withInternalID: true },
    });
  }
}

export default MainPage;
