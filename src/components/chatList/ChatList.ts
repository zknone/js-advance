import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatListProps } from '../../types/chat';
import ChatItem from '../chatItem/ChatItem';

class ChatList extends TemplateBlock<ChatListProps> {
  constructor(props: ChatListProps) {
    const tagName = 'ul';
    const tagClassName = 'chat-list';
    super(
      'chatList',
      {
        ...props,
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    this.children.chatList = this.props.chatList.map((chat) => new ChatItem(chat));
    return this.compile('chatList', this.props);
  }
}

export default ChatList;
