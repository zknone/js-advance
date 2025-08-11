import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageListProps } from '../../types/chat';

/**
 * MessageList
 *
 * @param props Props inside: {
 * messages: Array<Message>;
 * className?: string;
 * loading?: boolean;
 * error?: string;
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

  render() {
    return this.compile('messageList', this.props);
  }
}

export default MessageList;
