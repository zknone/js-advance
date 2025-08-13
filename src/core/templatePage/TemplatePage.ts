/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import type { PublicPageProps, WithPage } from '../../types/pages';
import TemplateBlock from '../templateBlock/TemplateBlock';

class TemplatePage<P extends PublicPageProps> extends TemplateBlock<WithPage<P>> {
  constructor(props: WithPage<P>) {
    super(props.page, props as WithPage<P>);
  }

  protected gatherChildren(): void {}

  render() {
    this.gatherChildren();
    return this.compile(this.props.page, this.props);
  }
}

export default TemplatePage;
