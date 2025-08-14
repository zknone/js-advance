import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';

interface NotFoundPageProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}

class NotFoundPage extends TemplatePage<NotFoundPageProps> {
  constructor(props: NotFoundPageProps) {
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
    this.children.customLink = new CustomLink(this.props.customLink);
  }
}

export default NotFoundPage;
