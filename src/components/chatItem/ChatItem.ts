import { API_BASE_URL } from '../../consts/api';
import { ROUTES } from '../../consts/routes';
import router from '../../core/routerEngine/router';
import store from '../../core/store/store';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatItemProps } from '../../types/chat';

class ChatItem extends TemplateBlock<ChatItemProps & Record<string, unknown>> {
  constructor(props: ChatItemProps) {
    const defaultProps: Partial<ChatItemProps> = {
      unreadCount: 0,
    };

    const chosenChat = Number(store.getState().query?.id) ?? null;

    const chatId = props?.id ?? null;

    const tagName = 'li';
    const tagClassName = `chat-item ${chatId === chosenChat && 'chat-item--active'}`;

    super(
      'chatItem',
      {
        ...defaultProps,
        ...props,
        avatar: props.avatar ? `${API_BASE_URL}/resources${props.avatar}` : null,
        settings: {
          withInternalID: true,
        },
        events: {
          click: {
            handler(e: Event) {
              e.preventDefault();
              const targetId = props.id as number;
              if (targetId) {
                store.set('activeChat', targetId);
                router.go({ pathname: ROUTES.messenger, query: { id: targetId.toString() } });
              }
            },
          },
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
