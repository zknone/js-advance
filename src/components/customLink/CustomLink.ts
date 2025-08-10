import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomLinkProps } from '../../types/chat';

/**
 * CustomButton
 *
 * @param props Props inside: {text, type, variant, classname и events}
 */
class CustomButton extends TemplateBlock<CustomLinkProps> {
  constructor(props: CustomLinkProps) {
    const defaultProps: Partial<CustomLinkProps> = {};

    super('customLink', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }
}

export default CustomButton;
