import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatListProps } from '../../types/chat';

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
}

export default ChatList;
