import set from '../../utils/set';
import EventBus from '../eventBus/EventBus';

type Indexed = Record<string, unknown>;

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export default store;
