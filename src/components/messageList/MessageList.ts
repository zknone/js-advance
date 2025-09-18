import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageListProps } from '../../types/chat';
import MessageItem from '../messageItem/MessageItem';

class MessageList extends TemplateBlock<MessageListProps> {
  constructor(props: MessageListProps) {
    const tagName = 'ul';
    const tagClassName = 'message-list';
    super(
      'messageList',
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
    const { messageList } = this.props;
    if (messageList) {
      this.children.messageList = messageList.map((message) => new MessageItem(message));
    }
    return this.compile('messageList', this.props);
  }
}

export default MessageList;
