import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseApi';

const chatMessagesAPIInstance = new HTTPTransport('api/v1/messages');
class ChatMessagesAPI extends BaseAPI {
  request({ id }: { id: string }) {
    return chatMessagesAPIInstance.get({
      url: `/${id}`,
    });
  }
}

export default ChatMessagesAPI;
