import type { Indexed, Path } from '../../types/core';
import GuardProperty from '../../utils/decorators/guardProperty';
import parsePath from '../../utils/parsePath';
import queryStringify from '../../utils/queryStringify';
import type TemplatePage from '../templatePage/TemplatePage';
import Route from './route';

class Router {
  routes: Route[];

  history: History;

  static __instance: Router | null = null;

  private _currentRoute: Route | null | undefined;

  private _rootQuery: Indexed | undefined;

  constructor(rootQuery: Indexed) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: Indexed): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname: Path, block: new () => TemplatePage<any>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    if (this.routes) {
      this.routes.push(route);
    }

    return this;
  }

  start() {
    window.onpopstate = (event: Event) => {
      const target = event.currentTarget as Window;
      if (target) {
        this._onRoute(parsePath(target.location.pathname));
      } else {
        throw new Error('Problem with routing');
      }
    };

    this._onRoute(parsePath(window.location.pathname));
  }

  _onRoute(pathname: Path) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  @(GuardProperty<Router>()('history', 'there is no history'))
  private pushState(pathname: Path) {
    this.history!.pushState({}, '', `${pathname.pathname}/${queryStringify(pathname.query)}`);
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
