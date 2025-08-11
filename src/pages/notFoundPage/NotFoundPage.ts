import CustomLink from '../../components/customLink/CustomLink';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomLinkProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';

interface NotFoundPageProps extends BlockBasics<AdditionalField> {
  customLink: CustomLinkProps;
}
/**
 * LoadingErrorPage
 *
 * @param props Props inside: {}
 */
class NotFoundPage extends TemplateBlock<NotFoundPageProps> {
  constructor(props: NotFoundPageProps) {
    const defaultProps: Partial<NotFoundPageProps> = {};

    super('notFoundPage', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    this.children.customLink = new CustomLink(this.props.customLink);
    return this.compile('notFoundPage', this.props);
  }
}

export default NotFoundPage;
