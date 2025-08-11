/* eslint-disable no-underscore-dangle */
import type { AdditionalField } from '../../types/core';
import Block from '../block/Block';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplateBlock<P extends AdditionalField> extends Block<P> {
  constructor(templateName: string, props: P, tagName = 'div') {
    super(tagName, { ...props, templateName });
  }

  compile(template: string, props: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((item) => `<div data-id="${item.__id}"></div>`).join('');
      } else propsAndStubs[key] = `<div data-id="${child.__id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = TemplateEngine.getRegistry().renderComponent(template, propsAndStubs);

    Object.values(this.children).forEach((childOrList) => {
      const list = Array.isArray(childOrList) ? childOrList : [childOrList];

      list.forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child.__id}"]`);
        if (stub) {
          const content = child.getContent();
          if (content) stub.replaceWith(content);
        }
      });
    });

    return fragment.content;
  }
}

export default TemplateBlock;
