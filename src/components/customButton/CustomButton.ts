import TemplateBlock from '../../core/templateBlock/TemplateBlock';

export interface CustomButtonProps {
  text: string;
  className?: string;
  variant?: 'primary' | 'link';
  type?: 'button' | 'submit' | 'reset';
  events?: Record<string, EventListenerOrEventListenerObject>;
}
/**
 * CustomButton
 *
 * @param props Props inside: {text, type, variant, classname и events}
 */
class CustomButton extends TemplateBlock<CustomButtonProps & Record<string, unknown>> {
  constructor(props: CustomButtonProps) {
    const defaultProps: Partial<CustomButtonProps> = {
      type: 'button',
      variant: 'primary',
    };

    super('customButton', { ...defaultProps, ...props });
  }
}

export default CustomButton;
