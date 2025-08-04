import { AbstractModelImpl } from '../abstract/AbstractModelImpl';

export default class AppModel extends AbstractModelImpl {
  initApp() {
    this.notify('app:init');
  }

  reactToError() {
    this.notify('app:error');
  }
}
