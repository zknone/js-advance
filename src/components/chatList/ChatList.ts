import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatItemProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';

export interface ChatListProps extends BlockBasics<AdditionalField> {
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
    super('chatList', {
      ...chats,
      settings: {
        withInternalID: true,
      },
    });
    this.render();
  }
}

export default ChatList;
