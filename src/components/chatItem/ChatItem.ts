import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatItemProps } from '../../types/chat';

/**
 * ChatItem
 *
 * @param props Props inside: {  name: string;
  className?: string;
  message: string;
  unreadCount?: number;
  events?: Record<string, EventListenerOrEventListenerObject>;}
 */
class ChatItem extends TemplateBlock<ChatItemProps & Record<string, unknown>> {
  constructor(props: ChatItemProps) {
    const defaultProps: Partial<ChatItemProps> = {
      unreadCount: 0,
    };

    super('chatItem', { ...defaultProps, ...props });
  }
}

export default ChatItem;
