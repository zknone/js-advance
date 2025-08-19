import ChatList from '../../components/chatList/ChatList';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import CustomLink from '../../components/customLink/CustomLink';
import MessageList from '../../components/messageList/MessageList';
import MessageQuill from '../../components/messageQuill/MessageQuill';
import Search from '../../components/search/Search';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { PAGE, type MainPageProps } from '../../types/pages';

class MainPage extends TemplatePage<MainPageProps> {
  constructor(props: MainPageProps) {
    super({
      ...props,
      page: PAGE.MAIN,
      settings: {
        withInternalID: true,
      },
      tagName: 'section',
      tagClassName: 'main-page',
    });
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
