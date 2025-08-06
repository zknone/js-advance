import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatItemProps } from '../../types/chat';
import ChatItem from '../chatItem/ChatItem';

export interface ChatListProps extends Record<string, unknown> {
  chats: ChatItemProps[];
}
/**
 * ChatList
 *
 * @param props Props inside: {
  chats: Record<string, unknown>;
}
 */
class ChatList extends TemplateBlock<ChatListProps> {
  constructor(chats: ChatListProps) {
    super('chatList', chats);
    this.generateChatList();
  }

  generateChatList() {
    this.props.chats.forEach((chat) => {
      const chatItem = new ChatItem({ ...chat });

      const { element } = this;

      if (element) {
        element?.appendChild(chatItem.getContent()!);
        chatItem.dispatchComponentDidMount();
      }
    });
  }
}

export default ChatList;
