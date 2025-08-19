import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomLinkProps } from '../../types/chat';

/**
 * CustomLink component for rendering a customizable link.
 *
 * @param props Props inside: {link: string; text: string; className?: string;}
 */
class CustomLink extends TemplateBlock<CustomLinkProps> {
  constructor(props: CustomLinkProps) {
    const defaultProps: Partial<CustomLinkProps> = {
      text: '',
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'a';
    const tagNameClass = 'custom-link';

    super(
      'customLink',
      {
        ...defaultProps,
        ...props,
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagNameClass
    );
  }

  render() {
    return this.compile('customLink', this.props);
  }
}

export default CustomLink;
