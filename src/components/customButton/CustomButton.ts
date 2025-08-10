import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { AdditionalField, BlockBasics } from '../../types/core';

export interface CustomButtonProps extends BlockBasics<AdditionalField> {
  text: string;
  className?: string;
  variant?: 'primary' | 'link';
  type?: 'button' | 'submit' | 'reset';
}
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
}

export default CustomButton;
