import type { ISocketData } from '../../types/socket';
import set from '../../utils/set';
import Socket from './socket';

class SocketOrchestration {
  activeSockets: Record<string, Socket>;

  constructor() {
    this.activeSockets = {};
  }

  addNewSocket(data: ISocketData) {
    const { chatId } = data;
    const exactSocket = this.getSocketByChatId(chatId);

    if (!exactSocket) {
      const newSocket = { chatId: new Socket(data) };

      set(this.activeSockets, chatId.toString(), newSocket);
    }
  }

  getSocketByChatId(chatId: number) {
    return this.activeSockets[chatId];
  }

  removeSocket(chatId: number) {
    const socket = this.activeSockets[chatId];
    if (socket) {
      socket.close();
      delete this.activeSockets[chatId];
    }
  }

  sendMessage(chatId: number, message: string) {
    const socket = this.getSocketByChatId(chatId);
    if (socket) {
      socket.send(message);
    } else {
      console.warn(`Нет активного сокета для чата ${chatId}`);
    }
  }

  closeAllSockets() {
    Object.values(this.activeSockets).forEach((socket) => {
      socket.close();
    });
    this.activeSockets = {};
  }

  isConnected(chatId: number): boolean {
    const socket = this.activeSockets[chatId];
    return socket ? socket.isOpen() : false;
  }
}

const socketOrchestration = new SocketOrchestration();

export default socketOrchestration;
