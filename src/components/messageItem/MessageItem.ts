import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageItemProps } from '../../types/chat';

/**
 * MessageItem
 *
 * @param props Props inside: {}
 */

class MessageItem extends TemplateBlock<MessageItemProps> {
  constructor(props: MessageItemProps) {
    const defaultProps: Partial<MessageItemProps> = {};

    super('messageItem', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });

    //   this.children.button = new Button({
    //     text: this.props.buttonText
    // });
  }
}

export default MessageItem;
