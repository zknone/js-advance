/* eslint-disable no-console */
import type { MessageItemProps } from 'types/chat';
import type { FlattenIfArray } from '../../types/core';
import type { IMessageResponse, ISocketData } from '../../types/socket';
import parseMessages from '../../utils/parseMessages';
import store from '../store/store';

const OLD_MESSAGES_COUNT = 20;

class Socket {
  userId: number;

  onOpen?: () => void;

  private socket: WebSocket | null = null;

  chatId: number;

  token: string;

  messagesStartWith = 0;

  constructor(props: ISocketData) {
    this.userId = props.userId;
    this.chatId = props.chatId;
    this.token = props.token;
  }

  fetchOld() {
    const howMuchMore =
      this.messagesStartWith === 0 ? '0' : (this.messagesStartWith * OLD_MESSAGES_COUNT).toString();
    this.send(howMuchMore, 'get old');
  }

  private handleParsedMessages(parsed: MessageItemProps[] | MessageItemProps) {
    if (Array.isArray(parsed) && parsed.length === OLD_MESSAGES_COUNT) {
      this.messagesStartWith += 1;
      this.fetchOld();
    }

    const { messages } = store.getState();
    const current = messages?.[this.chatId] ?? [];

    const newMessages = Array.isArray(parsed) ? [...current, ...parsed] : [parsed, ...current];

    store.set(`messages.${this.chatId}`, newMessages);
  }

  init() {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`
    );

    this.socket.addEventListener('open', () => {
      this.onOpen?.();
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
        const parsed = parseMessages(
          JSON.parse(event.data) as FlattenIfArray<IMessageResponse>,
          this.userId
        );

        this.handleParsedMessages(parsed);
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
