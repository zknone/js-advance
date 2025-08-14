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

  public children: Record<string, Block<any> | Block<any>[]> = {};

  protected props!: RawProps;

  _element: HTMLElement | null = null;

  _meta: Meta<RawProps> = null;

  __id: string | null = null;

  private eventBus: () => EventBus;

  id: any;

  constructor(
    tagName = 'div',
    tagClassName = '',
    propsAndChildren: BlockBasics<RawProps> = {} as BlockBasics<RawProps>
  ) {
    const eventBus = new EventBus();
    const defaultSettings = { withInternalID: true };

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this.__id = makeUUID();

    this._meta = {
      tagName,
      tagClassName,
      props: {} as RawProps,
    };

    const flatChildren: Block<any>[] = [];

    Object.values(children).forEach((val) => {
      if (Array.isArray(val)) flatChildren.push(...val);
      else flatChildren.push(val);
    });

    const fullProps = {
      ...(props as Partial<RawProps>),
      children: flatChildren as RawProps['children'],
      settings: {
        ...defaultSettings,
        ...((props as any).settings ?? {}),
      },
      __id: this.getId(),
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

  getId() {
    if (this.__id) {
      return this.__id;
    }
    throw new Error('Айди не присвоен');
  }

  getTagName() {
    return this._meta?.tagName;
  }

  getTagClassName() {
    return this._meta?.tagClassName;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _getChildren(propsAndChildren: BlockBasics<AdditionalField>): {
    children: Record<string, Block<any> | Block<any>[]>;
    props: Partial<RawProps>;
  } {
    const children: Record<string, Block<any> | Block<any>[]> = {};
    const props: Partial<RawProps> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value as Block<any>[];
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
    Object.values(this.children).forEach((childOrList) => {
      if (Array.isArray(childOrList)) childOrList.forEach((c) => c.dispatchComponentDidMount());
      else childOrList.dispatchComponentDidMount();
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

    const { props, children } = this._getChildren(nextProps);

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    // для листов тоже
  };

  get element() {
    return this._element;
  }

  _render() {
    const element = this._element;

    if (element) {
      const out = this.render();
      this._removeEvents();

      if (typeof out === 'string') {
        const tpl = document.createElement('template');
        tpl.innerHTML = out;
        element.replaceChildren(tpl.content);
      } else {
        element.replaceChildren(out);
      }
    }

    this._addEvents();
  }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const list: (Block<any> | Block<BlockBasics<AdditionalField>>)[] = [];

    Object.values(this.children).forEach((val) => {
      if (Array.isArray(val)) list.push(...val);
      else list.push(val);
    });

    list.forEach((child: Block<BlockBasics<AdditionalField>>) => {
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
    const withInternalID = (this.props as any)?.settings?.withInternalID;
    if (withInternalID && this.getId() && this.getTagClassName()) {
      element.setAttribute('data-id', this.getId());
      element.className = this.getTagClassName() || '';
    }

    return element;
  }

  createDocumentElement(tagName: string) {
    return this._createDocumentElement(tagName);
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
