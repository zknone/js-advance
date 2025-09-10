import type { Indexed } from '../../types/core';
import type { PublicPageProps, WithPage } from '../../types/pages';
import TemplateBlock from '../templateBlock/TemplateBlock';

class TemplatePage<P extends PublicPageProps> extends TemplateBlock<WithPage<P>> {
  constructor(props: WithPage<P>) {
    super(props.page, props as WithPage<P>, props.tagName, props.tagClassName);
  }

  protected gatherChildren(): void {}

  addQuery(query: Indexed | null) {
    this.setProps({ ...this.props, query });
  }

  render() {
    this.gatherChildren();
    return this.compile(this.props.page, this.props);
  }
}

export default TemplatePage;
