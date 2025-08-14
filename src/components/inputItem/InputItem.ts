import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InputItemProps } from '../../types/chat';

/**
 * InputItem
 *
 * @param props Props inside: {}
 */

class InputItem extends TemplateBlock<InputItemProps> {
  constructor(props: InputItemProps) {
    const defaultProps: Partial<InputItemProps> = {
      placeholder: '',
      value: '',
      type: 'text',
      name: '',
      title: '',
      className: '',
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'div';
    const tagClassName = 'input-item';

    super(
      'inputItem',
      {
        ...defaultProps,
        ...props,
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    return this.compile('inputItem', this.props);
  }
}

export default InputItem;
