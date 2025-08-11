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
      link: '',
      text: '',
      className: '',
      settings: {
        withInternalID: true,
      },
    };

    super('customLink', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('customLink', this.props);
  }
}

export default CustomLink;
