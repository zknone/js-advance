import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InfoFieldProps } from '../../types/chat';

class InfoEditField extends TemplateBlock<InfoFieldProps> {
  constructor(props: InfoFieldProps) {
    const defaultProps: Partial<InfoFieldProps> = {
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'label';
    const tagClassName = 'profile-edit-row';

    super(
      'infoEditField',
      {
        ...defaultProps,
        ...props,
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
    return this.compile('infoEditField', this.props);
  }
}

export default InfoEditField;
