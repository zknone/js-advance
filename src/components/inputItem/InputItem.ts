import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InputItemProps } from '../../types/chat';

class InputItem extends TemplateBlock<InputItemProps> {
  constructor(props: InputItemProps) {
    const defaultProps: Partial<InputItemProps> = {
      placeholder: '',
      value: '',
      type: 'text',
      name: '',
      title: '',
      variant: 'regular',
      settings: {
        withInternalID: true,
      },
    };
    const { variant } = props;

    const tagName = 'div';
    const tagClassName =
      variant === 'regular' ? 'input-item input-item--regular' : 'input-item input-item--quill';

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
