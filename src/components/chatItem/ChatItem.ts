import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatItemProps } from '../../types/chat';

class ChatItem extends TemplateBlock<ChatItemProps & Record<string, unknown>> {
  constructor(props: ChatItemProps) {
    const defaultProps: Partial<ChatItemProps> = {
      unreadCount: 0,
    };

    const tagName = 'li';
    const tagClassName = 'chat-item';

    super(
      'chatItem',
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
    return this.compile('chatItem', this.props);
  }
}

export default ChatItem;
