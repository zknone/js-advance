/* eslint-disable no-underscore-dangle */
import type { AdditionalField } from '../../types/core';
import TemplateBlock from '../templateBlock/TemplateBlock';
import TemplateEngine from '../templateEngine/TemplateEngine';

class TemplatePage<P extends AdditionalField> extends TemplateBlock<P> {
  constructor(pageTemplate: string, props: P, tagName = 'section') {
    super(tagName, { ...props, pageTemplate });
  }
}

export default TemplatePage;
