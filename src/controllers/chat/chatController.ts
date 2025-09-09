import { ROUTES } from '../../consts/routes';
import store from '../../core/store/store';
import ChatApi from '../../core/api/chatApi';
import Router from '../../core/routerEngine/router';
import withStoreStatus from '../../utils/decorators/withStoreStatus';
import type { AdditionalField } from '../../types/core';

const chatAPI = new ChatApi();
const router = new Router('#app');

interface IChatDataItem extends AdditionalField {
  id: string | number;
}

class ChatController {
  @withStoreStatus('Ошибка запроса чатов', () => router.go({ pathname: ROUTES.messenger }))
  async getChats() {
    const chats = await chatAPI.getChats();
    store.set('chats', chats);
  }

  @withStoreStatus('Ошибка запроса создания чата', () => router.go({ pathname: ROUTES.messenger }))
  async createNewChat(title: string) {
    const newChat = await chatAPI.createNewChat(title);
    const prevState = store.getState();
    store.set('chats', { ...prevState, newChat });
  }

  @withStoreStatus('Ошибка запроса создания чата', () => router.go({ pathname: ROUTES.messenger }))
  async deleteChat(id: string) {
    await chatAPI.deleteChat(id);
    const { chats } = store.getState();
    if (chats) {
      const updatedChats = (chats as IChatDataItem[]).filter((item) => item.id !== id);
      store.set('chats', updatedChats);
    }
  }

  @withStoreStatus('Ошибка запроса создания чата')
  async getFiles(id: string) {
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
  async setArchived(id: string) {
    await chatAPI.setArchived(id);
    const { chats, chatsArchive } = store.getState() as {
      chats?: IChatDataItem[];
      chatsArchive?: IChatDataItem[];
    };

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
  async setUnarchived(id: string) {
    await chatAPI.setUnarchived(id);

    const { chats, chatsArchive } = store.getState() as {
      chats?: IChatDataItem[];
      chatsArchive?: IChatDataItem[];
    };

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
  async getCommonChat(id: string) {
    const data = await chatAPI.getCommonChat(id);
    store.set('commonChat', { [String(id)]: data });
    return data;
  }

  @withStoreStatus('Ошибка получения пользователей чата')
  async getChatUsers(id: string) {
    const users = await chatAPI.getChatUsers(id);
    store.set('chatUsers', { [String(id)]: users });
    return users;
  }

  @withStoreStatus('Ошибка счётчика новых сообщений')
  async getNewMessageCount(id: string) {
    const res = await chatAPI.getNewMessageCount(id);
    const count = typeof res === 'object' && res && 'count' in res ? (res as any).count : res;
    store.set('newMessageCount', {
      ...(store.getState() as any).newMessageCount,
      [String(id)]: count,
    });
    return count;
  }

  @withStoreStatus('Ошибка загрузки аватарки')
  async addAvatar(id: string, file: File) {
    const updated = await chatAPI.addAvatar(id, file);
    const { chats } = store.getState() as { chats?: IChatDataItem[] };
    if (Array.isArray(chats)) {
      const next = chats.map((c) => (String(c.id) === String(id) ? { ...c, ...updated } : c));
      store.set('chats', next);
    }
    return updated;
  }

  @withStoreStatus('Ошибка добавления пользователей')
  async addUsersToChat(users: number[], chatId: number) {
    const res = await chatAPI.addUsersToChat({ users, chatId });
    return res;
  }

  @withStoreStatus('Ошибка удаления пользователей')
  async removeUsersFromChat(users: number[], chatId: number) {
    const res = await chatAPI.removeUsersFromChat({ users, chatId });
    return res;
  }
}

export default ChatController;
