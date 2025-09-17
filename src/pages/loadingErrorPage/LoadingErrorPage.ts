import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { AdditionalField } from '../../types/core';

import { PAGE, type WithPage } from '../../types/pages';

class LoadingErrorPage extends TemplatePage<WithPage<AdditionalField>> {
  constructor(props?: WithPage<AdditionalField>) {
    super({
      ...props,
      page: PAGE.LOADING_ERROR,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'loading-error-page',
    });
  }

  protected gatherChildren() {
    this.children.customLink = new CustomLink({
      text: 'Назад',
      href: '/',
      settings: { withInternalID: true },
    });
  }
}

export default LoadingErrorPage;
