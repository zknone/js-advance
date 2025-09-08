import { API_BASE_URL, apiRoutes } from '../../consts/api';
import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';

const chatMessagesAPIInstance = new HTTPTransport(API_BASE_URL);
class ChatMessagesAPI extends BaseAPI {
  request() {
    return chatMessagesAPIInstance.get({
      url: apiRoutes.CHATS,
    });
  }

  getChats() {
    return this.request();
  }

  createNewChat() {
    return chatMessagesAPIInstance.post({
      url: apiRoutes.CHATS,
    });
  }

  deleteChat(id: string) {
    return chatMessagesAPIInstance.delete({
      url: apiRoutes.CHATS,
      options: {
        data: { id },
      },
    });
  }

  getFiles(id: string) {
    return chatMessagesAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/files`,
      options: {
        data: { id },
      },
    });
  }

  getArchive() {
    return chatMessagesAPIInstance.get({
      url: apiRoutes.CHATS_ARCHIVE,
    });
  }

  setArchived(id: string) {
    return chatMessagesAPIInstance.post({
      url: apiRoutes.CHATS_ARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  setUnarchived(id: string) {
    return chatMessagesAPIInstance.post({
      url: apiRoutes.CHATS_UNARCHIVE,
      options: {
        data: { id },
      },
    });
  }

  getCommonChat(id: string) {
    return chatMessagesAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/common`,
      options: {
        data: { id },
      },
    });
  }

  getChatUsers(id: string) {
    return chatMessagesAPIInstance.get({
      url: `${apiRoutes.CHATS}/${id}/users`,
      options: {
        data: { id },
      },
    });
  }

  getNewMessageCount(id: string) {
    return chatMessagesAPIInstance.get({
      url: `${apiRoutes.CHATS}/new/${id}`,
      options: {
        data: { id },
      },
    });
  }

  addAvatar(id: string, avatar: any) {
    return chatMessagesAPIInstance.put({
      url: apiRoutes.ADD_CHAT_AVATAR,
      options: {
        data: { id, avatar },
      },
    });
  }

  addUsersToChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatMessagesAPIInstance.put({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  removeUsersToChat({ users, chatId }: { users: number[]; chatId: number }) {
    return chatMessagesAPIInstance.delete({
      url: apiRoutes.CHAT_USERS,
      options: {
        data: { users, chatId },
      },
    });
  }

  connectUsers(id: string) {
    return chatMessagesAPIInstance.get({
      url: `${apiRoutes.GET_CHAT_USERS}/${id}`,
      options: {
        data: { id },
      },
    });
  }
}

export default ChatMessagesAPI;
