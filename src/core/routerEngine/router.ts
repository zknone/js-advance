import type { AdditionalField, Path } from '../../types/core';
import GuardProperty from '../../utils/decorators/guardProperty';
import parsePath from '../../utils/parsePath';
import queryStringify from '../../utils/queryStringify';
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

  _onRoute(pathname: Path) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  private pushState(path: Path) {
    const qs = path.query ? queryStringify(path.query) : undefined;
    const url = qs ? `${path.pathname}?${qs}` : path.pathname;
    this.history.pushState(path, '', url);
  }

  go(pathname: Path) {
    this.pushState(pathname);
    this._onRoute(pathname);
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  back() {
    this.history!.back();
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

export default Router;
