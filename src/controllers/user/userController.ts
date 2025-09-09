import store from '../../core/store/store';
import Router from '../../core/routerEngine/router';
import UserAPI from '../../core/api/userAPI';
import type { ILogin, INewUser, IPassword, IProfile } from '../../core/api/interfaces';
import { ROUTES } from '../../consts/routes';
import withStoreStatus from '../../utils/decorators/withStoreStatus';

const userAPI = new UserAPI();

const router = new Router('#app');

class UserController {
  async fetchMe() {
    const xhr = await userAPI.getUser();
    const user = JSON.parse(xhr.response);
    store.set('auth.user', user);
  }

  @withStoreStatus('Ошибка создания юзера', () => router.go({ pathname: ROUTES.login }))
  async signUp(data: INewUser) {
    await userAPI.signUp(data);
    await this.fetchMe();
  }

  @withStoreStatus('Ошибка логирования', () => router.go({ pathname: ROUTES.messenger }))
  async signIn(data: ILogin) {
    await userAPI.signIn(data);
    await this.fetchMe();
  }

  @withStoreStatus('Ошибка разлогирования')
  async logOut() {
    await userAPI.logOut();
    store.set('auth.user', null);
  }

  @withStoreStatus('Ошибка смены данных')
  async changeProfile(data: IProfile) {
    await userAPI.changeProfile(data);
    await this.fetchMe();
  }

  @withStoreStatus('Ошибка смены пароля')
  async changePassword(data: IPassword) {
    await userAPI.changePassword(data);
  }

  @withStoreStatus('Ошибка смены аватара')
  async changeAvatar(avatar: any) {
    await userAPI.changeProfileAvatar(avatar);
    await this.fetchMe();
  }

  @withStoreStatus('Юзер не найден')
  async findUser(login: string) {
    const foundUsers = await userAPI.findUser(login);
    store.set('foundUsers', foundUsers);
  }
}

const userController = new UserController();
export default userController;
