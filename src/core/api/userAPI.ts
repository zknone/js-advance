import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';

const chatAPIInstance = new HTTPTransport('api/v1/user');

class UserAPI extends BaseAPI {
  create() {
    return chatAPIInstance.post({
      url: '/',
      options: {
        data: {
          name: 'string',
        },
      },
    });
  }

  request() {
    return chatAPIInstance.get({ url: '/user' });
  }

  static getUser(id: string) {
    return chatAPIInstance.get({
      url: `/${id}`,
    });
  }
}

export default UserAPI;
