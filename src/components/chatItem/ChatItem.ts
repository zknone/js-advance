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

    const queryId = store.getState().query?.id;
    const chosenChat = queryId !== undefined ? Number(queryId) : null;

    const chatId = props?.id ?? null;
    const isActive =
      chatId !== null && chosenChat !== null && !Number.isNaN(chosenChat) && chatId === chosenChat;

    const tagName = 'li';
    const tagClassName = ['chat-item', isActive ? 'chat-item--active' : null]
      .filter(Boolean)
      .join(' ');

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
