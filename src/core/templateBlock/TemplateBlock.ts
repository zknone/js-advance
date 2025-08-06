import Block from '../block/Block';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplateBlock<P extends Record<string, unknown>> extends Block<P> {
  constructor(templateName: string, props: P, tagName = 'div') {
    super(tagName, { ...props, templateName });
  }

  render(): string {
    const { templateName } = this.props;
    const template = TemplateEngine.getRegistry().renderComponent(templateName as string, {
      ...this.props,
    });
    return template;
  }
}

export default TemplateBlock;
