import type { AdditionalField } from '../../types/core';
import Block from '../block/Block';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplateBlock<P extends AdditionalField> extends Block<P> {
  constructor(templateName: string, props: P, tagName: string, tagClassName: string) {
    super(tagName, tagClassName, { ...props, templateName });
  }

  compile(template: string, props: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    const getBaseToReplace = (item: Block<AdditionalField>) => `<div data-id="${item.__id}"></div>`;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((item) => getBaseToReplace(item)).join('');
      } else propsAndStubs[key] = getBaseToReplace(child);
    });

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;

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

  init() {
    super.init();

    if (this.element instanceof HTMLButtonElement) {
      const btnType = (this.props as AdditionalField).type;
      if (btnType === 'submit' || btnType === 'reset' || btnType === 'button') {
        (this.element as HTMLButtonElement).type = btnType as 'submit' | 'reset' | 'button';
      } else {
        (this.element as HTMLButtonElement).type = 'button';
      }

      const button = this.element as HTMLButtonElement;
      button.type = btnType as 'submit' | 'reset' | 'button';
    }

    if (this.element instanceof HTMLAnchorElement) {
      const link = this.element as HTMLAnchorElement;
      link.href = typeof this.props.href === 'string' ? this.props.href : '/';
    }
  }
}

export default TemplateBlock;
