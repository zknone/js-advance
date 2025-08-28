import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';

const chatAPIInstance = new HTTPTransport('api/v1/chats');

class ChatAPI extends BaseAPI {
  create() {
    return chatAPIInstance.post({
      url: '/',
      options: {
        data: {
          title: 'string',
        },
      },
    });
  }

  request() {
    return chatAPIInstance.get({ url: '/full' });
  }
}

export default ChatAPI;
