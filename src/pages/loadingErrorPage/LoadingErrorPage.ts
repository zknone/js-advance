import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';

interface LoadingErrorPublicProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}

class LoadingErrorPage extends TemplatePage<LoadingErrorPublicProps> {
  constructor(props: LoadingErrorPublicProps) {
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
      ...this.props.customLink,
      settings: { withInternalID: true },
    });
  }
}

export default LoadingErrorPage;
