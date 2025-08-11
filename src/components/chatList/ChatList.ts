import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatListProps } from '../../types/chat';
import ChatItem from '../chatItem/ChatItem';
/**
 * ChatList
 *
 * @param props Props inside: {
  chats: Record<string, unknown>;
}
 */
class ChatList extends TemplateBlock<ChatListProps> {
  constructor(props: ChatListProps) {
    super('chatList', {
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    this.children.chats = this.props.chats.map((chat) => new ChatItem(chat));
    return this.compile('chatList', this.props);
  }
}

export default ChatList;
