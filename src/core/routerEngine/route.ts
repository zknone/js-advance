import type { Indexed, Path } from '../../types/core';
import isEqual from '../../utils/isEqual';
import renderPage from '../../utils/renderPage';
import type TemplatePage from '../templatePage/TemplatePage';

class Route {
  private _pathname: Path;

  private _blockClass: new () => TemplatePage<any>;

  private _block: TemplatePage<any> | null;

  private _props: { rootQuery: Indexed | undefined };

  constructor(
    pathname: Path,
    view: new () => TemplatePage<any>,
    props: { rootQuery: Indexed | undefined }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: Path) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: Path) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderPage(this._block, this._props.rootQuery ?? {});
      return;
    }

    this._block.show();
  }
}

export default Route;
