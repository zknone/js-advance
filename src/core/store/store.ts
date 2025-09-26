import type { Listener, StoreListener } from '../../types/core';
import type { IStore } from '../../types/store';
import set from '../../utils/set';
import EventBus from '../eventBus/EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: IStore = {
    auth: {
      error: null,
      loading: false,
    },
    user: null,
    chats: null,
    chatsArchived: null,
    messages: {},
    query: {
      id: null,
      editing: 'view',
    },
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set<IStore>(this.state, path, value);
    this.emit(StoreEvents.Updated, this.state);
  }

  public subscribe(callback: StoreListener) {
    callback(this.getState());
    const handler: Listener = (state: unknown) => {
      callback(state as IStore);
    };
    this.on(StoreEvents.Updated, handler);
    return () => this.off(StoreEvents.Updated, handler);
  }

  public unsubscribe(callback: StoreListener) {
    const handler: Listener = (state: unknown) => {
      callback(state as IStore);
    };

    this.off(StoreEvents.Updated, handler);
  }
}

const store = new Store();

export default store;
