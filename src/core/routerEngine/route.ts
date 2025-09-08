import type { Path, AdditionalField } from '../../types/core';
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
      this._pathname.pathname = pathname.pathname;
      this.render(pathname.query);
    }
  }

  leave() {
    this._block?.hide();
  }

  match(pathname: Path) {
    return isEqual(pathname.pathname, this._pathname.pathname);
  }

  render(query?: Record<string, string>) {
    const props = {
      ...this._pageProps,
      query,
    } as unknown as P;

    if (!this._block) {
      this._block = new this._blockClass(props);
      renderPage(this._block, this._rootQuery);
      return;
    }
    this._block.show();
  }
}

export default Route;
