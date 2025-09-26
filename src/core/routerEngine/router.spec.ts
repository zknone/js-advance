import { expect } from 'chai';
import type { Path } from 'types/core';
import type { IStore } from 'types/store';
import store from '../store/store';
import { ROUTES } from '../../consts/routes';
import router from './router';
import type Route from './route';

describe('router start', () => {
  let calledWith: Path | null;
  let originalGetState: () => IStore;

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

  const unauthorizedState: IStore = {
    auth: null,
    user: null,
    chats: null,
    chatsArchived: null,
    messages: null,
  };

  beforeEach(() => {
    window.history.pushState({}, '', ROUTES.login);

    originalGetState = store.getState;
    store.getState = () => unauthorizedState;

    const existingRoutes = [ROUTES.login, ROUTES.messenger, ROUTES.settings, ROUTES.signup];

    const defaultFakeRoutMock = {
      navigate: (p: Path) => {
        calledWith = p;
      },
      leave: () => {},
      isProtected: () => false,
    };

    const defaultFakeProtectedRoutMock = {
      ...defaultFakeRoutMock,
      isProtected: () => true,
    };

    const fakeLoginRoute: Partial<Route<any>> = {
      ...defaultFakeRoutMock,
      match: (p: Path) => p.pathname === ROUTES.login,
      getPathname: () => ({ pathname: ROUTES.login }),
    };

    const fakeSignupRoute: Partial<Route<any>> = {
      ...defaultFakeRoutMock,
      match: (p: Path) => p.pathname === ROUTES.signup,
      getPathname: () => ({ pathname: ROUTES.signup }),
    };

    const fakeSettingsRoute: Partial<Route<any>> = {
      ...defaultFakeProtectedRoutMock,
      match: (p: Path) => p.pathname === ROUTES.settings,
      getPathname: () => ({ pathname: ROUTES.settings }),
    };

    const fakeMessengerRoute: Partial<Route<any>> = {
      match: (p: Path) => p.pathname === ROUTES.messenger,
      getPathname: () => ({ pathname: ROUTES.messenger }),
      ...defaultFakeProtectedRoutMock,
    };

    const defaultNotFoundRoute: Partial<Route<any>> = {
      match: (p: Path) => !existingRoutes.includes(p.pathname),
      getPathname: () => ({ pathname: ROUTES[404] }),
      ...defaultFakeProtectedRoutMock,
    };

    router.routes = [
      fakeLoginRoute as Route<any>,
      fakeSettingsRoute as Route<any>,
      fakeMessengerRoute as Route<any>,
      fakeSignupRoute as Route<any>,
      defaultNotFoundRoute as Route<any>,
    ];
  });

  afterEach(() => {
    store.getState = originalGetState;
  });

  it('navigates to /login on start', () => {
    router.start();
    expect(calledWith).to.deep.equal({ pathname: ROUTES.login, query: {} });
  });

  it('moves forward to next routes', () => {
    router.start();

    window.history.pushState({}, '', ROUTES.signup);
    window.dispatchEvent(new PopStateEvent('popstate', { state: { pathname: ROUTES.signup } }));
    expect(calledWith).to.deep.equal({ pathname: ROUTES.signup });

    window.history.pushState({}, '', ROUTES.signup);
    window.dispatchEvent(
      new PopStateEvent('popstate', {
        state: { pathname: ROUTES.signup },
      })
    );
    expect(calledWith).to.deep.equal({ pathname: ROUTES.signup });
  });

  it('moves with router go', () => {
    router.start();
    router.go({ pathname: ROUTES.login });
    expect(calledWith).to.deep.equal({ pathname: ROUTES.login });
  });

  it('moves with router go with actual query', () => {
    router.start();
    store.getState = () => startingState;
    router.go({ pathname: ROUTES.messenger, query: { id: 12 } });
    expect(calledWith).to.deep.equal({ pathname: ROUTES.messenger, query: { id: 12 } });
  });

  it('moves with router go, between multiple routes', () => {
    router.start();
    router.go({ pathname: ROUTES.login });
    expect(calledWith).to.deep.equal({ pathname: ROUTES.login });
    store.getState = () => startingState;
    router.go({ pathname: ROUTES.messenger, query: { id: 12 } });
    expect(calledWith).to.deep.equal({ pathname: ROUTES.messenger, query: { id: 12 } });
  });

  it('calls leave on previous route when navigating to another', () => {
    let leaveCalled = false;

    (router.routes.find((r) => r.getPathname().pathname === ROUTES.login) as any).leave = () => {
      leaveCalled = true;
    };

    router.start();
    router.go({ pathname: ROUTES.login });
    router.go({ pathname: ROUTES.signup });

    expect(leaveCalled).to.equal(true);
    expect(calledWith).to.deep.equal({ pathname: ROUTES.signup });
  });

  it('moves with router go to non-existing path', () => {
    router.start();
    store.getState = () => startingState;
    router.go({ pathname: '/non-existents-path' });
    expect(calledWith).to.deep.equal({ pathname: ROUTES[404] });
  });

  it('moves with router go under protected route', () => {
    store.getState = () => unauthorizedState;
    router.start();
    router.go({ pathname: ROUTES.messenger, query: { id: 12 } });
    expect(calledWith).to.deep.equal({ pathname: ROUTES.login });
  });

  it('moves with forward', () => {
    router.start();
    let forwardCalled = false;
    const originalForward = window.history.forward;

    window.history.forward = () => {
      forwardCalled = true;
    };

    router.forward();
    expect(forwardCalled).to.be.equal(true);
    window.history.back = originalForward;
  });

  it('moves with back', () => {
    router.start();
    let backCalled = false;
    const originalBack = window.history.forward;

    window.history.back = () => {
      backCalled = true;
    };

    router.back();
    expect(backCalled).to.be.equal(true);
    window.history.back = originalBack;
  });

  it('resets query in store when navigating without query', () => {
    router.start();

    let queryState: any = { id: null, editing: 'view' };

    store.getState = () => ({ ...startingState, query: queryState }) as IStore;
    (store as any).set = (key: string, value: any) => {
      if (key === 'query') {
        queryState = value;
      }
    };

    router.go({ pathname: ROUTES.login });

    expect(queryState).to.deep.equal({});
  });
});
