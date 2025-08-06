import Block from '../block/Block';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplateBlock<P extends Record<string, unknown>> extends Block<P> {
  private templateName: string;

  constructor(templateName: string, props: P, tagName = 'div') {
    super(tagName, { ...props, templateName });
    this.templateName = templateName;
  }

  render(): string {
    const name = this.templateName;
    console.log('templateName', name);
    return TemplateEngine.getRegistry().renderComponent(name, this.getProps());
  }
}

export default TemplateBlock;
