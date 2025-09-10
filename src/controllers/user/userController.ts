import store from '../../core/store/store';
import UserAPI from '../../core/api/userAPI';
import type {
  IApiError,
  ILogin,
  INewUser,
  INewUserResponse,
  IPassword,
  IProfile,
} from '../../core/api/interfaces';
import { ROUTES } from '../../consts/routes';
import withStoreStatus from '../../utils/decorators/withStoreStatus';
import router from '../../core/routerEngine/router';

const userAPI = new UserAPI();

class UserController {
  async fetchMe() {
    const user = await userAPI.getUser();
    store.set('user', user);
  }

  @withStoreStatus('Ошибка создания юзера', () => router.go({ pathname: ROUTES.login }))
  async signUp(data: INewUser) {
    (await userAPI.signUp(data)) as unknown as INewUserResponse;
    await this.fetchMe();
  }

  @withStoreStatus('Ошибка логирования', () => router.go({ pathname: ROUTES.messenger }))
  async signIn(data: ILogin) {
    try {
      await userAPI.signIn(data);
      await this.fetchMe();
    } catch (err) {
      const error = err as IApiError;
      if (error.reason === 'User already in system') {
        await this.fetchMe();
      }
    }
  }

  @withStoreStatus('Ошибка разлогирования')
  async logOut() {
    store.set('user', null);
    await userAPI.logOut();
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
