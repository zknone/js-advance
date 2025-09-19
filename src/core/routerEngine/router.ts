import { ROUTES } from '../../consts/routes';
import type { AdditionalField, Path } from '../../types/core';
import GuardProperty from '../../utils/decorators/guardProperty';
import hidden from '../../utils/decorators/hidden';
import parsePath from '../../utils/parsePath';
import queryStringify from '../../utils/queryStringify';
import store from '../store/store';
import type TemplatePage from '../templatePage/TemplatePage';
import Route from './route';

type PageCtor<P extends AdditionalField = AdditionalField> = new (props: P) => TemplatePage<P>;

class Router {
  routes: Route<any>[];

  history: History;

  static __instance: Router | null = null;

  private _currentRoute: Route<any> | null | undefined;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use<P extends AdditionalField>(pathname: Path, View: PageCtor<P>, pageProps?: P | undefined) {
    const route = new Route<P>(pathname, View, {
      rootQuery: this._rootQuery,
      pageProps,
    });

    this.routes.push(route as unknown as Route<any>);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.state) {
        this._onRoute(event.state as Path);
      } else {
        this._onRoute(parsePath(window.location.pathname, window.location.search));
      }
    };
    this._onRoute(parsePath(window.location.pathname, window.location.search));
  }

  @hidden
  _onRoute(pathname: Path) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go({ pathname: ROUTES[404] });
      return;
    }

    const isProtected = route.isProtected() ?? false;
    const isLoggedIn = Boolean(store.getState()?.user);

    if (isProtected && !isLoggedIn) {
      this.go({ pathname: ROUTES.login });
      return;
    }

    if ((pathname.pathname === ROUTES.login || pathname.pathname === ROUTES.signup) && isLoggedIn) {
      this.go({ pathname: ROUTES.messenger, query: pathname.query });
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (pathname.query) {
      store.set('query', pathname.query);
    } else {
      store.set('query', {});
    }

    route.navigate(pathname);
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  private pushState(path: Path) {
    const qs = path.query ? queryStringify(path.query) : '';
    const url = `${path.pathname}${qs ? `?${qs}` : ''}`;
    this.history.pushState(path, '', url);
  }

  go(path: Path) {
    this.pushState(path);
    this._onRoute(path);
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  back() {
    this.history.back();
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  forward() {
    this.history!.forward();
  }

  @(GuardProperty<Router>()('routes', 'there is no routes'))
  getRoute(pathname: Path) {
    return this.routes!.find((route) => route.match(pathname));
  }
}

const router = new Router('#app');

export default router;
