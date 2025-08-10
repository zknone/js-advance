import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomButtonProps } from '../../types/chat';

/**
 * CustomButton
 *
 * @param props Props inside: {text, type, variant, classname и events}
 */
class CustomButton extends TemplateBlock<CustomButtonProps> {
  constructor(props: CustomButtonProps) {
    const defaultProps: Partial<CustomButtonProps> = {
      type: 'button',
      variant: 'primary',
    };

    super('customButton', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('customButton', this.props);
  }
}

export default CustomButton;
