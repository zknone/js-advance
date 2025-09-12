import type { Path, AdditionalField, Indexed } from '../../types/core';
import isEqual from '../../utils/isEqual';
import renderPage from '../../utils/renderPage';
import type TemplatePage from '../templatePage/TemplatePage';

type PageCtor<P extends AdditionalField = AdditionalField> = new (props: P) => TemplatePage<P>;

class Route<P extends AdditionalField = AdditionalField> {
  private _pathname: Path;

  private _blockClass: PageCtor<P>;

  private _block: TemplatePage<P> | null;

  private _rootQuery: string;

  private _pageProps: AdditionalField;

  constructor(
    pathname: Path,
    view: PageCtor<P>,
    props: { rootQuery: string; pageProps: P | undefined }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = props.rootQuery;
    this._pageProps = props?.pageProps ?? {};
  }

  navigate(pathname: Path) {
    if (this.match(pathname)) {
      this.render(pathname.query);
    }
  }

  isProtected() {
    return this._pathname.protected;
  }

  leave() {
    this._block?.hide();
  }

  match(pathname: Path) {
    return isEqual(pathname.pathname, this._pathname.pathname);
  }

  render(query?: Indexed) {
    if (!this._block) {
      const props = {
        ...this._pageProps,
        query,
      } as unknown as P;
      this._block = new this._blockClass(props);
      renderPage(this._block, this._rootQuery);
      return;
    }

    if (query) {
      this._block.addQuery(query);
    } else {
      this._block.addQuery(null);
    }
    renderPage(this._block, this._rootQuery);
    this._block.show();
  }
}

export default Route;
