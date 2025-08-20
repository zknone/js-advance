import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InputItemProps } from '../../types/chat';

class InputItem extends TemplateBlock<InputItemProps> {
  constructor(props: InputItemProps) {
    const defaultProps: Partial<InputItemProps> = {
      type: 'text',
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
        onChange: (newValue: string) => {
          this.props.value = newValue;

          if (typeof this.props.onFieldChange === 'function') {
            this.props.onFieldChange(this.props.value, this.props.name);
          }
        },
        onBlur: () => {
          if (typeof this.props.onFieldBlur === 'function') {
            this.props.onFieldBlur(this.props.value, this.props.name);
          }
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    console.log(this.props);
    return this.compile('inputItem', this.props);
  }
}

export default InputItem;
