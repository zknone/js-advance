import { API_BASE_URL, apiRoutes } from '../../consts/api';
import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';
import type { IChat, IFilesSent, IToken, IUser } from './interfaces';

const chatApiInstance = new HTTPTransport(API_BASE_URL);
class ChatAPI extends BaseAPI {
  request({
    limit = 100,
    offset = 0,
    title,
  }: {
    offset?: number;
    limit?: number;
    title?: string;
  }): Promise<IChat[]> {
    return chatApiInstance.get({
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
    return chatApiInstance.post({
      url: apiRoutes.CHATS,
      options: {
        data: { title },
      },
    });
  }

  deleteChat(id: number): Promise<{ id: number }> {
    return chatApiInstance.delete({
      url: apiRoutes.CHATS,
      options: {
        data: { id },
      },
    });
  }

  getFiles(id: number): Promise<IFilesSent> {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/files`,
      options: {
        data: { id },
      },
    });
  }

  getArchive(): Promise<IChat[]> {
    return chatApiInstance.get({
      url: apiRoutes.CHATS_ARCHIVE,
    });
  }

  setArchived(id: number): Promise<IChat> {
    return chatApiInstance.post({
      url: apiRoutes.CHATS_ARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  setUnarchived(id: number): Promise<IChat> {
    return chatApiInstance.post({
      url: apiRoutes.CHATS_UNARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  getCommonChat(id: number): Promise<IChat[]> {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/common`,
      options: {
        data: { id },
      },
    });
  }

  getChatUsers(id: number): Promise<IUser> {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/users`,
      options: {
        data: { id },
      },
    });
  }

  getNewMessageCount(id: number): Promise<{ unread_count: number }> {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/new/${id}`,
      options: {
        data: { id },
      },
    });
  }

  addAvatar(id: number, avatar: Blob): Promise<IChat> {
    return chatApiInstance.put({
      url: apiRoutes.ADD_CHAT_AVATAR,
      options: {
        data: { id, avatar },
      },
    });
  }

  addUsersToChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatApiInstance.put({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  removeUsersFromChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatApiInstance.delete({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  getChatToken(id: number): Promise<IToken> {
    return chatApiInstance.post({
      url: `${apiRoutes.GET_TOKEN}/${id}`,
      options: {
        data: { id },
      },
    });
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
