import { expect } from 'chai';

import { API_BASE_URL } from '../../consts/api';
import router from '../../core/routerEngine/router';
import store from '../../core/store/store';
import ChatItem from './ChatItem';
import type { IStore } from '../../types/store';
import type { Path } from '../../types/core';
import type { ChatItemProps } from '../../types/chat';
import { ROUTES } from '../../consts/routes';

describe('ChatItem', () => {
  let originalGetState: () => IStore;
  let originalRouterGo: (path: Path) => void;

  const startingState: IStore = {
    query: { id: null, editing: 'view' },
    user: {
      id: 0,
      first_name: '',
      second_name: '',
      display_name: null,
      phone: '',
      login: '',
      avatar: null,
      email: '',
    },
    chats: [],
    messages: [],
    auth: {
      error: null,
      loading: false,
    },
    chatsArchived: [],
  };

  beforeEach(() => {
    originalGetState = store.getState;
    originalRouterGo = router.go;

    store.getState = () => startingState;
  });

  afterEach(() => {
    store.getState = originalGetState;
    router.go = originalRouterGo;
  });

  const testData: ChatItemProps = {
    id: 123,
    name: 'Ivan Testovich',
    createdBy: 123,
    avatar: '123.jpg',
    lastMessage: {
      user: {
        firstName: '',
        secondName: '',
        avatar: '',
        email: '',
        login: '',
        phone: '',
      },
      time: '',
      content: '',
    },
    time: '12 часов',
    className: 'extra-class',
    unreadCount: 10,
  };

  const secondTestData: ChatItemProps = {
    id: 123,
    name: 'Ivan Testovich',
    createdBy: 123,
    avatar: null,
    lastMessage: null,
  };

  it(`defines name as ${testData.name}`, () => {
    const item = new ChatItem(testData);
    expect(item.getProps().name).to.equal(testData.name);
  });

  it(`defines id as ${testData.id}`, () => {
    const item = new ChatItem(testData);
    expect(item.getProps().id).to.equal(testData.id);
  });

  it(`defines createdBy as ${testData.createdBy}`, () => {
    const item = new ChatItem(testData);
    expect(item.getProps().createdBy).to.equal(testData.createdBy);
  });

  it(`defines avatar as ${testData.avatar}`, () => {
    const item = new ChatItem(testData);
    expect(item.getProps().avatar).to.equal(`${API_BASE_URL}/resources/123.jpg`);
  });

  it('defines avatar as null', () => {
    const item = new ChatItem(secondTestData);
    expect(item.getProps().avatar).to.equal(null);
  });

  it(`defines classname as ${testData.className}`, () => {
    const item = new ChatItem(testData);
    expect(item.getProps().className).to.equal(testData.className);
  });

  it('делает элемент активным, если query.id совпадает с props.id', () => {
    store.getState = () => ({
      ...startingState,
      query: {
        id: 5,
        editing: 'view',
      },
    });
    const item = new ChatItem({ ...secondTestData, id: 5, title: 'Active Chat' });
    expect((item as any).tagClassName).to.include('chat-item--active');
  });

  it('вызывает router.go при клике', () => {
    let calledWith: any = null;
    router.go = (args: any) => {
      calledWith = args;
    };

    const item = new ChatItem({ ...testData, id: 10, title: 'Clickable' });
    item.getProps().events!.click!.handler({ preventDefault: () => {} } as Event);

    expect(calledWith).to.deep.equal({
      pathname: ROUTES.messenger,
      query: { id: 10 },
    });
  });
});
