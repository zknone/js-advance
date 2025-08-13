import CustomLink from '../../components/customLink/CustomLink';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE, type PagesTypes } from '../../types/pages';

interface LoadingErrorPublicProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}

type LoadingErrorInternalProps = LoadingErrorPublicProps & { page: PagesTypes };
/**
 * LoadingErrorPage
 *
 * @param props Props inside: {}
 */
class LoadingErrorPage extends TemplatePage<LoadingErrorInternalProps> {
  constructor(props: LoadingErrorPublicProps) {
    super({
      ...props,
      page: PAGE.LOADING_ERROR,
      settings: {
        withInternalID: true,
      },
    });
  }

  protected gatherChildren() {
    console.log('получаем чилдренов', this.children);
    this.children.customLink = new CustomLink(this.props.customLink);
  }
}

export default LoadingErrorPage;
