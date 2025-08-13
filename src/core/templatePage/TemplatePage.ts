/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import type { AdditionalField } from '../../types/core';
import type { PagesTypes } from '../../types/pages';
import TemplateBlock from '../templateBlock/TemplateBlock';

interface TemplatePageProps extends AdditionalField {
  page: PagesTypes;
}

class TemplatePage<P extends TemplatePageProps> extends TemplateBlock<P> {
  constructor(props: P) {
    super(props.page, props);
  }

  protected gatherChildren(): void {}

  render() {
    this.gatherChildren();
    return this.compile(this.props.page, this.props);
  }
}

export default TemplatePage;
