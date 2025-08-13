import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE, type PagesTypes } from '../../types/pages';

interface NotFoundPageProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}

type InternalProps = NotFoundPageProps & { page: PagesTypes };
/**
 * LoadingErrorPage
 *
 * @param props Props inside: {}
 */
class NotFoundPage extends TemplatePage<InternalProps> {
  constructor(props: NotFoundPageProps) {
    super({
      ...props,
      page: PAGE.NOT_FOUND,
      settings: {
        withInternalID: true,
      },
    });
  }

  protected gatherChildren() {
    this.children.customLink = new CustomLink(this.props.customLink);
  }
}

export default NotFoundPage;
