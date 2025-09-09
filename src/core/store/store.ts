import type { Listener, StoreListener } from '../../types/core';
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

  public subscribe(callback: StoreListener) {
    const handler: Listener = (state: unknown) => {
      callback(state as Indexed);
    };
    this.on(StoreEvents.Updated, handler);
    return () => this.off(StoreEvents.Updated, handler);
  }

  public unsubscribe(callback: StoreListener) {
    const handler: Listener = (state: unknown) => {
      callback(state as Indexed);
    };

    this.off(StoreEvents.Updated, handler);
  }
}

const store = new Store();

export default store;
