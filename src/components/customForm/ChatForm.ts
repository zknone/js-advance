import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatFormProps } from '../../types/chat';

/**
 * ChatForm
 *
 * @param props Props inside: {}
 */
class ChatForm extends TemplateBlock<ChatFormProps> {
  constructor(props: ChatFormProps) {
    const defaultProps: Partial<ChatFormProps> = {};

    super('chatForm', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('chatForm', this.props);
  }
}

export default ChatForm;
