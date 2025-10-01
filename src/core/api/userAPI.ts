import { API_BASE_URL, apiRoutes } from '../../consts/api';
import type { ILogin, INewUser, IPassword, IProfile } from '../../types/api';
import HTTPTransport from './HTTPtransport';
import BaseAPI from './baseApi';

class UserAPI extends BaseAPI {
  private readonly userAPIInstance = new HTTPTransport(API_BASE_URL);

  signUp(data: INewUser) {
    return this.userAPIInstance.post({
      url: apiRoutes.SIGNUP,
      options: {
        data,
      },
    });
  }

  signIn(data: ILogin): Promise<{ id: number }> {
    return this.userAPIInstance.post({
      url: apiRoutes.SIGNIN,
      options: {
        data,
      },
    });
  }

  request() {
    return this.userAPIInstance.get({ url: apiRoutes.USER });
  }

  getUser() {
    return this.request();
  }

  logOut() {
    return this.userAPIInstance.post({ url: apiRoutes.LOGOUT });
  }

  changeProfile(data: IProfile) {
    return this.userAPIInstance.put({
      url: apiRoutes.CHANGE_PROFILE,
      options: {
        data,
      },
    });
  }

  changeProfileAvatar(formData: any) {
    return this.userAPIInstance.put({
      url: apiRoutes.CHANGE_AVATAR,
      options: {
        data: formData,
      },
    });
  }

  changePassword(data: IPassword) {
    return this.userAPIInstance.put({
      url: apiRoutes.CHANGE_PASSWORD,
      options: {
        data,
      },
    });
  }

  findUser(login: string) {
    return this.userAPIInstance.put({
      url: apiRoutes.FIND_USER,
      options: {
        data: { login },
      },
    });
  }
}

const userAPI = new UserAPI();
export default userAPI;
