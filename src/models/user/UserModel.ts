import { AbstractModelImpl } from '../abstract/AbstractModelImpl';

export default class UserModel extends AbstractModelImpl {
  async loadPersonalInfo() {
    this.notify('user:loaded');
  }
  async login() {
    this.notify('user:logged');
  }
  async quit() {
    this.notify('user:quit');
  }
  async changeCredentials() {
    this.notify('user:changedCredentials');
  }
  async changePassword() {
    this.notify('user:changedPassword');
  }
}
