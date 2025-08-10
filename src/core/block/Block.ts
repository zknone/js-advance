/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { v4 as makeUUID } from 'uuid';
import EventBus from '../eventBus/EventBus';
import type { AdditionalField, Meta, BlockBasics } from '../../types/core';

class Block<RawProps extends BlockBasics<AdditionalField>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  public children: Record<string, Block<any>> = {};

  protected props!: RawProps;

  _element: HTMLElement | null = null;

  _meta: Meta<RawProps> = null;

  __id: string | null = null;

  private eventBus: () => EventBus;

  id: any;

  constructor(
    tagName = 'div',
    propsAndChildren: BlockBasics<RawProps> = {} as BlockBasics<RawProps>
  ) {
    const eventBus = new EventBus();
    const defaultSettings = { withInternalID: true };

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this.__id = makeUUID();

    this._meta = {
      tagName,
      props: {} as RawProps,
    };

    const fullProps = {
      ...(props as Partial<RawProps>),
      children: Object.values(children) as RawProps['children'],
      settings: {
        ...defaultSettings,
        ...((props as any).settings ?? {}),
      },
      __id: this.__id,
    } as RawProps;

    this.props = this._makePropsProxy(fullProps);
    this._meta.props = this.props;
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected getProps(): BlockBasics<RawProps> {
    return this.props;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _getChildren(propsAndChildren: BlockBasics<AdditionalField>): {
    children: Record<string, Block<any>>;
    props: Partial<RawProps>;
  } {
    const children: Record<string, Block<any>> = {};
    const props: Partial<RawProps> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        (props as Record<string, unknown>)[key] = value;
      }
    });

    return { children, props };
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
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  // @ts-ignore
  componentDidMount(oldProps?: RawProps) {
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps?: RawProps, newProps?: RawProps) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this._render();
    }
  }

  // @ts-ignore
  componentDidUpdate(oldProps?: RawProps, newProps?: RawProps) {
    return true;
  }

  setProps = (nextProps: RawProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const element = this._element;

    this._removeEvents();

    if (element) {
      const elementToAppend = this.render();
      element.replaceChildren(elementToAppend);
    }

    this._addEvents();
  }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    (this.props.children ?? []).forEach((child: Block<BlockBasics<AdditionalField>>) => {
      const node = child.getContent();
      if (node) fragment.appendChild(node);
    });
    return fragment;
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

  _makePropsProxy(props: RawProps) {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        const oldProps = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[prop as keyof RawProps] = value;

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
    const element = document.createElement(tagName);
    return element;
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
