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
    const tagClassName = 'profile-info-row';

    super(
      'infoEditField',
      {
        ...defaultProps,
        ...props,
      },
      tagName,
      tagClassName
    );
  }

  postProcess(fragment: DocumentFragment) {
    const input = fragment.querySelector('input[data-input="value"]');
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.props.onChange?.(target.value);
      });
    }
  }

  componentDidUpdate(oldProps: InfoFieldProps, newProps: InfoFieldProps): boolean {
    const { value } = this.props;

    console.log({ value });

    return true;
  }

  render() {
    return this.compile('infoEditField', this.props);
  }
}

export default InfoEditField;
