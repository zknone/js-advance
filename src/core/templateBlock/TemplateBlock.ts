import renderComponentSomewhere from '../../utils/renderCompopentsSomewhere';
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

  renderList<ComponentProps extends Record<string, unknown>>(
    ComponentClass: new (props: ComponentProps) => TemplateBlock<ComponentProps>,
    data: ComponentProps[]
  ) {
    const { element } = this;
    const isListReady = Array.isArray(data) && data.length > 0;

    if (element && isListReady) {
      data.forEach((chat) => {
        const component = new ComponentClass({ ...chat });
        renderComponentSomewhere(element, component);
      });
    }
  }
}

export default TemplateBlock;
