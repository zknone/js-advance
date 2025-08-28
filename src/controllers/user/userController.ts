import UserApi from '../../core/api/userAPI';
import store from '../../core/store/store';

class UserController {
  public getUser(id: string) {
    UserApi.getUser(id).then((data) => store.set('user', data));
  }
}

export default UserController;
