import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageItemProps } from '../../types/chat';

class MessageItem extends TemplateBlock<MessageItemProps> {
  constructor(props: MessageItemProps) {
    const defaultProps: Partial<MessageItemProps> = {
      text: '',
      isOwn: true,
      time: '',
      image: '',
    };

    const tagName = 'li';
    const tagClassName = props.isOwn ? 'message-item message-item--own' : 'message-item';

    super(
      'messageItem',
      {
        ...defaultProps,
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
    return this.compile('messageItem', this.props);
  }
}

export default MessageItem;
