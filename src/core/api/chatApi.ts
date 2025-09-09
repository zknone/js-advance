import { API_BASE_URL, apiRoutes } from '../../consts/api';
import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';

const chatApiInstance = new HTTPTransport(API_BASE_URL);
class ChatApi extends BaseAPI {
  request() {
    return chatApiInstance.get({
      url: apiRoutes.CHATS,
    });
  }

  getChats() {
    return this.request();
  }

  createNewChat(title: string) {
    return chatApiInstance.post({
      url: apiRoutes.CHATS,
      options: {
        data: { title },
      },
    });
  }

  deleteChat(id: string) {
    return chatApiInstance.delete({
      url: apiRoutes.CHATS,
      options: {
        id,
      },
    });
  }

  getFiles(id: string) {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/files`,
      options: {
        id,
      },
    });
  }

  getArchive() {
    return chatApiInstance.get({
      url: apiRoutes.CHATS_ARCHIVE,
    });
  }

  setArchived(id: string) {
    return chatApiInstance.post({
      url: apiRoutes.CHATS_ARCHIVE,
      options: {
        id,
      },
    });
  }

  setUnarchived(id: string) {
    return chatApiInstance.post({
      url: apiRoutes.CHATS_UNARCHIVE,
      options: {
        id,
      },
    });
  }

  getCommonChat(id: string) {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/common`,
      options: {
        id,
      },
    });
  }

  getChatUsers(id: string) {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/${id}/users`,
      options: {
        id,
      },
    });
  }

  getNewMessageCount(id: string) {
    return chatApiInstance.get({
      url: `${apiRoutes.CHATS}/new/${id}`,
      options: {
        id,
      },
    });
  }

  addAvatar(id: string, avatar: any) {
    return chatApiInstance.put({
      url: apiRoutes.ADD_CHAT_AVATAR,
      options: {
        id,
        avatar,
      },
    });
  }

  addUsersToChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatApiInstance.put({
      url: apiRoutes.CHAT_USERS,
      options: {
        users,
        chatId,
      },
    });
  }

  removeUsersFromChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatApiInstance.delete({
      url: apiRoutes.CHAT_USERS,
      options: {
        users,
        chatId,
      },
    });
  }

  connectUsers(id: string) {
    return chatApiInstance.get({
      url: `${apiRoutes.GET_CHAT_USERS}/${id}`,
      options: {
        id,
      },
    });
  }
}

export default ChatApi;
