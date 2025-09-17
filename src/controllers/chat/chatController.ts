import { ROUTES } from '../../consts/routes';
import store from '../../core/store/store';
import withStoreStatus from '../../utils/decorators/withStoreStatus';
import router from '../../core/routerEngine/router';
import chatAPI from '../../core/api/chatApi';
import transformFetchedChats from '../../utils/transformFetchedChats';

class ChatController {
  @withStoreStatus('Ошибка запроса чатов', () => router.go({ pathname: ROUTES.messenger }))
  async getChats() {
    const rawChats = await chatAPI.getChats({ limit: 100 });
    const modifiedChats = transformFetchedChats(rawChats);
    store.set('chats', modifiedChats);
  }

  @withStoreStatus('Ошибка запроса создания чата', () => router.go({ pathname: ROUTES.messenger }))
  async createNewChat(title: string) {
    const newId = await chatAPI.createNewChat(title);
    await this.getChats();

    return newId;
  }

  @withStoreStatus('Ошибка запроса создания чата', () => router.go({ pathname: ROUTES.messenger }))
  async deleteChat(id: number) {
    await chatAPI.deleteChat(id);
    const { chats } = store.getState();
    if (chats) {
      const updatedChats = chats.filter((item) => item.id !== id);
      store.set('chats', updatedChats);
    }
  }

  @withStoreStatus('Ошибка запроса создания чата')
  async getFiles(id: number) {
    const files = chatAPI.deleteChat(id);
    store.set('chatFiles', { [String(id)]: files });
    return files;
  }

  @withStoreStatus('Ошибка получения архива')
  async getArchive() {
    const archive = await chatAPI.getArchive();
    store.set('chatsArchive', archive);
    return archive;
  }

  @withStoreStatus('Ошибка помещения в архив')
  async setArchived(id: number) {
    await chatAPI.setArchived(id);
    const { chats, chatsArchive } = store.getState();

    if (Array.isArray(chats)) {
      const moved = chats.find((c) => String(c.id) === String(id));
      const left = chats.filter((c) => String(c.id) !== String(id));
      store.set('chats', left);
      if (moved) {
        store.set('chatsArchive', Array.isArray(chatsArchive) ? [...chatsArchive, moved] : [moved]);
      }
    }
  }

  @withStoreStatus('Ошибка возврата из архива')
  async setUnarchived(id: number) {
    await chatAPI.setUnarchived(id);

    const { chats, chatsArchive } = store.getState();

    if (Array.isArray(chatsArchive)) {
      const moved = chatsArchive.find((c) => String(c.id) === String(id));
      const left = chatsArchive.filter((c) => String(c.id) !== String(id));
      store.set('chatsArchive', left);
      if (moved) {
        store.set('chats', Array.isArray(chats) ? [...chats, moved] : [moved]);
      }
    }
  }

  @withStoreStatus('Ошибка получения общего чата')
  async getCommonChat(id: number) {
    const data = await chatAPI.getCommonChat(id);
    store.set('commonChat', { [String(id)]: data });
    return data;
  }

  @withStoreStatus('Ошибка получения пользователей чата')
  async getChatUsers(id: number) {
    const users = await chatAPI.getChatUsers(id);
    store.set('chatUsers', { [String(id)]: users });
    return users;
  }

  @withStoreStatus('Ошибка счётчика новых сообщений')
  async getNewMessageCount(id: number) {
    const res = await chatAPI.getNewMessageCount(id);
    const count = typeof res === 'object' && res && 'count' in res ? (res as any).count : res;
    store.set('newMessageCount', {
      ...(store.getState() as any).newMessageCount,
      [String(id)]: count,
    });
    return count;
  }

  @withStoreStatus('Ошибка загрузки аватарки')
  async addAvatar(id: number, file: File) {
    const formData = new FormData();
    formData.append('chatId', String(id));
    formData.append('avatar', file);
    const updated = await chatAPI.addAvatar(formData);
    const { chats } = store.getState();
    if (Array.isArray(chats)) {
      const next = chats.map((c) => (String(c.id) === String(id) ? { ...c, ...updated } : c));
      store.set('chats', next);
    }
    return updated;
  }

  @withStoreStatus('Ошибка добавления пользователей')
  async addUsersToChat(users: number[], chatId: number) {
    return chatAPI.addUsersToChat({ users, chatId });
  }

  @withStoreStatus('Ошибка удаления пользователей')
  async removeUsersFromChat(users: number[], chatId: number) {
    return chatAPI.removeUsersFromChat({ users, chatId });
  }

  @withStoreStatus('Ошибка получения токена на подключение к сокету')
  async getChatToken(id: number) {
    return chatAPI.getChatToken(id);
  }
}

const chatController = new ChatController();

export default chatController;
