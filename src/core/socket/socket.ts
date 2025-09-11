import type { ISocketData } from '../../types/socket';

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
      console.log('Соединение установлено');
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
      console.log('Получены данные', event.data);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  send(content: string, type: 'message' | 'file' = 'message') {
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
