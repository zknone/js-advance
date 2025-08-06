import TemplateBlock from '../../core/templateBlock/TemplateBlock';

export interface CustomButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  events?: Record<string, EventListenerOrEventListenerObject>;
  [key: string]: unknown;
}

class CustomButton extends TemplateBlock<CustomButtonProps> {
  constructor(props: CustomButtonProps) {
    super('customButton', props, 'button');
  }
}

export default CustomButton;
