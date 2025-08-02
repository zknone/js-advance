import { AbstractModelImpl } from '../abstract/AbstractModelImpl';

export default class UserModel extends AbstractModelImpl {
  async receive() {
    this.notify('socket:received');
  }

  async send() {
    this.notify('socket:sent');
  }

  async edit() {
    this.notify('socket:edited');
  }

  async delete() {
    this.notify('socket:deleted');
  }
}
