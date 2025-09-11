import ChatList from '../../components/chatList/ChatList';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import CustomLink from '../../components/customLink/CustomLink';
import MessageList from '../../components/messageList/MessageList';
import MessageQuill from '../../components/messageQuill/MessageQuill';
import Search from '../../components/search/Search';
import chatController from '../../controllers/chat/chatController';
import store from '../../core/store/store';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { mainPageData } from '../../mocks/chat';
import { PAGE, type MainPageProps } from '../../types/pages';
import type { IStore } from '../../types/store';

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
      messageList: mainPageData.messageList,
      messageQuill: mainPageData.messageQuill,
    });

    this.subscribe = store.subscribe((state: IStore) => {
      const user = state?.user;
      const chats = state?.chats;
      if (!user) return;

      this.setProps({ ...this.props, chatList: chats ?? [] });
    });
  }

  componentDidMount(): void {
    if (!store.getState().chats) {
      chatController.getChats();
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
      settings: { withInternalID: true },
    });

    this.children.messageQuill = new MessageQuill({
      ...this.props.messageQuill,
      settings: { withInternalID: true },
    });
  }
}

export default MainPage;
