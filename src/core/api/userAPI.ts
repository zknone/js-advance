import { API_BASE_URL, apiRoutes } from '../../consts/api';
import HTTPTransport from '../../utils/fetch';
import BaseAPI from './baseAPI';
import type { ILogin, INewUser, IPassword, IProfile } from './interfaces';

const chatAPIInstance = new HTTPTransport(API_BASE_URL);

class UserAPI extends BaseAPI {
  signUp(data: INewUser) {
    return chatAPIInstance.post({
      url: apiRoutes.SIGNUP,
      options: {
        data,
      },
    });
  }

  signIn(data: ILogin) {
    return chatAPIInstance.post({
      url: apiRoutes.SIGNIN,
      options: {
        data,
      },
    });
  }

  request() {
    return chatAPIInstance.get({ url: apiRoutes.USER });
  }

  getUser() {
    return this.request();
  }

  logOut() {
    return chatAPIInstance.post({ url: apiRoutes.LOGOUT });
  }

  changeProfile(data: IProfile) {
    return chatAPIInstance.put({
      url: apiRoutes.CHANGE_PROFILE,
      options: {
        data,
      },
    });
  }

  changeProfileAvatar(avatar: any) {
    return chatAPIInstance.put({
      url: apiRoutes.CHANGE_AVATAR,
      options: {
        data: {
          avatar,
        },
      },
    });
  }

  changePassword(data: IPassword) {
    return chatAPIInstance.put({
      url: apiRoutes.CHANGE_PASSWORD,
      options: {
        data,
      },
    });
  }

  findUser(login: string) {
    return chatAPIInstance.put({
      url: apiRoutes.FIND_USER,
      options: {
        data: { login },
      },
    });
  }
}

export default UserAPI;
