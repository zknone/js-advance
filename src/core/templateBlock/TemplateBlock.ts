import type { AdditionalField } from '../../types/core';
import Block from '../block/Block';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplateBlock<P extends AdditionalField> extends Block<P> {
  constructor(templateName: string, props: P, tagName = 'div') {
    super(tagName, { ...props, templateName });
  }

  compileToFragment(html) {
    // eslint-disable-next-line no-underscore-dangle
    const tpl = this._createDocumentElement('template') as HTMLTemplateElement;
    tpl.innerHTML = html;

    console.log({ tpl });

    Object.values(this.children).forEach((child) => {
      const stub = tpl.content.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        console.log({ stub });
        const content = child.getContent();
        if (content) stub.replaceWith(content);
      }
    });

    return tpl.content;
  }

  render(): DocumentFragment {
    const { templateName, ...rest } = this.getProps() as unknown as {
      templateName: string;
      [k: string]: unknown;
    };

    const propsAndStubs: Record<string, unknown> = { ...rest };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    console.log({ propsAndStubs });

    const html = TemplateEngine.getRegistry().renderComponent(templateName, propsAndStubs);

    return this.compileToFragment(html);
  }
}

export default TemplateBlock;
