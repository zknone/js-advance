/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import EventBus from '../eventBus/EventBus';

type EventsMap = Record<string, EventListenerOrEventListenerObject>;
type WithEvents<T> = T & { events?: EventsMap };

type Meta<T> = { tagName: string; props: WithEvents<T> } | null;

class Block<P extends Record<string, any> = object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  protected props: WithEvents<P>;

  _element: HTMLElement | null = null;

  _meta: Meta<P> = null;

  private eventBus: () => EventBus;

  constructor(tagName = 'div', props: WithEvents<P> = {} as WithEvents<P>) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected getProps(): WithEvents<P> {
    return this.props;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _notify(message: string) {
    const meta = this._meta;

    if (meta) {
      const { tagName } = meta;
      throw new Error(`${tagName}: ${message}`);
    }
  }

  _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    } else this._notify('BLock building: tags and props did not found');
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // @ts-ignore
  componentDidMount(oldProps?: P) {
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps?: P, newProps?: P) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this._render();
    }
  }

  // @ts-ignore
  componentDidUpdate(oldProps?: P, newProps?: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const html = this.render();
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    const newElement = template.content.firstElementChild as HTMLElement;

    if (!newElement) {
      this._notify('Template must return a root element');
      return;
    }

    this._removeEvents();

    if (this._element?.parentNode) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render(): string {
    const children = `${this.props.children?.map((child: WithEvents<P>) => child.getContent()?.outerHtml).join('') ?? ''}`;
    return children;
  }

  getContent() {
    return this.element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _makePropsProxy(props: P) {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        const oldProps = { ...target };

        console.log({ oldProps }, this);
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;

        const isUpdated = this.componentDidUpdate(oldProps, target);

        if (isUpdated) {
          this._render();
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Нельзя удалить свойство');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();

    if (element) {
      element.style.display = 'block';
    } else this._notify('Nothing to show');
  }

  hide() {
    const element = this.getContent();

    if (element) {
      element.style.display = 'none';
    } else this._notify('Nothing to hide');
  }

  destroy() {
    this._removeEvents();
    const element = this.getContent();
    if (element) {
      element.remove();
    } else this._notify('Nothing to destroy');
  }
}

export default Block;
