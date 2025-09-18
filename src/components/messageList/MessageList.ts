import store from '../../core/store/store';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageListProps } from '../../types/chat';
import type { StoreListener } from '../../types/core';
import type { IStore } from '../../types/store';
import MessageItem from '../messageItem/MessageItem';

class MessageList extends TemplateBlock<MessageListProps> {
  unsubscribe: StoreListener;

  constructor() {
    const tagName = 'ul';
    const tagClassName = 'message-list';
    super(
      'messageList',
      {
        messageList: [],
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagClassName
    );

    this.unsubscribe = store.subscribe((state: IStore) => {
      const { user } = state;
      const messages = state.messages ?? {};

      const { query } = state;
      const digitId = query?.id ?? null;

      const chatMessages = messages[Number(digitId)];

      const messageList = Object.values(chatMessages ?? {}) ?? [];

      if (!user) return;

      if (digitId) {
        this.setProps({
          ...this.props,
          messageList,
        });
      } else {
        this.setProps({
          ...this.props,
          messageList: [],
        });
      }
    });
  }

  componentDidMount(): void {
    const container = document.querySelector('.message-list') as HTMLElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  render() {
    const { messageList } = this.props;
    if (messageList) {
      this.children.messageList = messageList.map((message) => new MessageItem(message));
    }
    const container = document.querySelector('.message-list') as HTMLElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    return this.compile('messageList', this.props);
  }
}

export default MessageList;
