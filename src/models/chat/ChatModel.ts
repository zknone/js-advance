import { AbstractModelImpl } from '../abstract/AbstractModelImpl';

export default class ChatModel extends AbstractModelImpl {
  async loadAllChats() {
    this.notify('chat:loadedAll');
  }

  async loadChat() {
    this.notify('chat:loaded');
  }

  async createNewChat() {
    this.notify('chat:created');
  }

  async deleteChat() {
    this.notify('chat:deleted');
  }

  async banUser() {
    this.notify('chat:userBanned');
  }
}
