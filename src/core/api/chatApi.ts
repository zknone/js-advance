import { API_BASE_URL, apiRoutes } from '../../consts/api';
import type { IChat, IFilesSent, IToken, IUser } from '../../types/api';
import HTTPTransport from './HTTPtransport';
import BaseAPI from './baseApi';

class ChatAPI extends BaseAPI {
  private readonly chatAPIInstance = new HTTPTransport(API_BASE_URL);

  request({
    limit = 100,
    offset = 0,
    title,
  }: {
    offset?: number;
    limit?: number;
    title?: string;
  }): Promise<IChat[]> {
    return this.chatAPIInstance.get({
      url: apiRoutes.CHATS,
      options: {
        limit,
        offset,
        title,
      },
    });
  }

  getChats({
    limit = 100,
    offset = 0,
    title,
  }: {
    offset?: number;
    limit?: number;
    title?: string;
  }): Promise<IChat[]> {
    return this.request({ limit, offset, title });
  }

  createNewChat(title: string): Promise<{ id: number }> {
    return this.chatAPIInstance.post({
      url: apiRoutes.CHATS,
      options: {
        data: { title },
      },
    });
  }

  deleteChat(chatId: number): Promise<{ chatId: number }> {
    return this.chatAPIInstance.delete({
      url: apiRoutes.CHATS,
      options: {
        data: { chatId },
      },
    });
  }

  getFiles(id: number): Promise<IFilesSent> {
    return this.chatAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/files`,
      options: {
        data: { id },
      },
    });
  }

  getArchive(): Promise<IChat[]> {
    return this.chatAPIInstance.get({
      url: apiRoutes.CHATS_ARCHIVE,
    });
  }

  setArchived(id: number): Promise<IChat> {
    return this.chatAPIInstance.post({
      url: apiRoutes.CHATS_ARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  setUnarchived(id: number): Promise<IChat> {
    return this.chatAPIInstance.post({
      url: apiRoutes.CHATS_UNARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  getCommonChat(id: number): Promise<IChat[]> {
    return this.chatAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/common`,
      options: {
        data: { id },
      },
    });
  }

  getChatUsers(id: number): Promise<IUser> {
    return this.chatAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/users`,
      options: {
        data: { id },
      },
    });
  }

  getNewMessageCount(id: number): Promise<{ unread_count: number }> {
    return this.chatAPIInstance.get({
      url: `${apiRoutes.CHATS}/new/${id}`,
      options: {
        data: { id },
      },
    });
  }

  addAvatar(formData: any): Promise<IChat> {
    return this.chatAPIInstance.put({
      url: apiRoutes.ADD_CHAT_AVATAR,
      options: {
        data: formData,
      },
    });
  }

  addUsersToChat({ users, chatId }: { users: number[]; chatId: number }) {
    return this.chatAPIInstance.put({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  removeUsersFromChat({ users, chatId }: { users: number[]; chatId: number }) {
    return this.chatAPIInstance.delete({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  getChatToken(id: number): Promise<IToken> {
    return this.chatAPIInstance.post({
      url: `${apiRoutes.GET_TOKEN}/${id}`,
      options: {
        data: { id },
      },
    });
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
