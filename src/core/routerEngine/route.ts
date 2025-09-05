import type { Path, AdditionalField } from '../../types/core';
import type { PublicPageProps } from '../../types/pages';
import isEqual from '../../utils/isEqual';
import renderPage from '../../utils/renderPage';
import type TemplatePage from '../templatePage/TemplatePage';

type BasePageProps = PublicPageProps & AdditionalField;

type PageCtor<P extends BasePageProps = BasePageProps> = new (props: P) => TemplatePage<P>;

class Route<P extends BasePageProps = BasePageProps> {
  private _pathname: Path;

  private _blockClass: PageCtor<P>;

  private _block: TemplatePage<P> | null;

  private _rootQuery: string;

  private _pageProps: P;

  constructor(pathname: Path, view: PageCtor<P>, props: { rootQuery: string; pageProps: P }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = props.rootQuery;
    this._pageProps = props.pageProps;
  }

  navigate(pathname: Path) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block?.hide();
  }

  match(pathname: Path) {
    return isEqual(pathname.pathname, this._pathname.pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({ ...this._pageProps, query: this._pathname.query });
      renderPage(this._block, this._rootQuery);
      return;
    }
    this._block.show();
  }
}

export default Route;
