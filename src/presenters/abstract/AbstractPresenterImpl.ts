import type { AbstractModelImpl } from '../../models/abstract/AbstractModelImpl';
import type { AbstractViewImpl } from '../../views/abstract/AbstractViewImpl';

export default class AbstractPresenterImp<
  M extends AbstractModelImpl,
  V extends AbstractViewImpl<null>,
> {
  protected model: M;
  protected view: V;

  constructor(model: M, view: V) {
    this.model = model;
    this.view = view;

    this.addEventListeners();
    window.queueMicrotask(() => this.updateView());
    window.addEventListener('popstate', this.handleViewUpdateState.bind(this));
  }

  createViewState() {
    return null;
  }

  handleViewUpdateState() {
    this.updateView();
  }

  addEventListeners() {}

  updateView() {
    this.view.state = this.createViewState();
    this.view.render();
  }

  setUrlParams(params: Record<string, string>) {
    const url = this.getUrl();

    url.search = '';

    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key]);
    });

    window.history.pushState(null, '', url.href);

    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  getUrlParams() {
    const url = this.getUrl();
    return url;
  }

  getUrl() {
    return new URL(window.location.href);
  }
}
