import CustomLink from '../../components/customLink/CustomLink';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';

interface ErrorLoadingPageProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}
/**
 * LoadingErrorPage
 *
 * @param props Props inside: {}
 */
class LoadingErrorPage extends TemplateBlock<ErrorLoadingPageProps> {
  constructor(props: ErrorLoadingPageProps) {
    const defaultProps: Partial<ErrorLoadingPageProps> = {};

    super('loadingErrorPage', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    this.children.customLink = new CustomLink(this.props.customLink);
    return this.compile('loadingErrorPage', this.props);
  }
}

export default LoadingErrorPage;
