import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageItemProps } from '../../types/chat';

/**
 * MessageItem
 *
 * @param props Props inside: {
 *  text: string; // Text of the message
 * isOwn: boolean; // Is the message sent by the user
 * time: string; // Time of the message
 * image: string; // URL of the user's avatar image}
 */

class MessageItem extends TemplateBlock<MessageItemProps> {
  constructor(props: MessageItemProps) {
    const defaultProps: Partial<MessageItemProps> = {
      text: '',
      isOwn: true,
      time: '',
      image: '',
    };

    super('messageItem', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('messageItem', this.props);
  }
}

export default MessageItem;
