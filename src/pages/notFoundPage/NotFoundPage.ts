import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { AdditionalField } from '../../types/core';

import { PAGE } from '../../types/pages';

class NotFoundPage extends TemplatePage<AdditionalField> {
  constructor(props?: AdditionalField) {
    super({
      ...props,
      page: PAGE.NOT_FOUND,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'not-found-page',
    });
  }

  protected gatherChildren() {
    this.children.customLink = new CustomLink({ text: 'Назад', href: '/' });
  }
}

export default NotFoundPage;
