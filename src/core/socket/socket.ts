import type { IMessageResponse, ISocketData } from '../../types/socket';
import { isArray } from '../../utils/checkTypes';
import store from '../store/store';
import socketOrchestration from './socketOrchestration';

class Socket {
  userId: number;

  private socket: WebSocket | null = null;

  chatId: number;

  token: string;

  constructor(props: ISocketData) {
    this.userId = props.userId;
    this.chatId = props.chatId;
    this.token = props.token;
  }

  init() {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`
    );

    this.socket.addEventListener('open', () => {
      socketOrchestration.fetchOld(this.chatId);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const parsed = JSON.parse(event.data) as IMessageResponse;

        if (parsed) {
          if (Array.isArray(parsed)) {
            parsed.map((item) => {
              const { user_id: userId, content, time, type, id } = item;
              return store.set(`messages.${this.chatId.toString()}.${item.id}`, {
                text: content,
                isOwn: userId === this.userId,
                time,
                id,
                type,
              });
            });
          } else {
            const { user_id: userId, content, time, type, id } = parsed;
            store.set(`messages.${this.chatId.toString()}.${id}`, {
              text: content,
              isOwn: userId === this.userId,
              time,
              id,
              type,
            });
          }
        }
      } catch (e) {
        console.error('Ошибка парсинга сообщения:', e, event.data);
      }
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  send(content: string, type: 'message' | 'file' | 'get old' = 'message') {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content, type }));
    } else {
      console.warn('Попытка отправки в закрытый сокет');
    }
  }

  close() {
    this.socket?.close();
    this.socket = null;
  }

  isOpen(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export default Socket;
