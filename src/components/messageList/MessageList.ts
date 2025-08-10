import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageListProps } from '../../types/chat';

/**
 * MessageList
 *
 * @param props Props inside: {
}
 */
class MessageList extends TemplateBlock<MessageListProps> {
  constructor(props: MessageListProps) {
    super('messageList', {
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }
}

export default MessageList;
