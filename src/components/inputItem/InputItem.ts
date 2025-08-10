import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InputItemProps } from '../../types/chat';

/**
 * InputItem
 *
 * @param props Props inside: {}
 */

class CustomButton extends TemplateBlock<InputItemProps> {
  constructor(props: InputItemProps) {
    const defaultProps: Partial<InputItemProps> = {};

    super('inputItem', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }
}

export default CustomButton;
