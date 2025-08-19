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

  render() {
    return this.compile('infoEditField', this.props);
  }
}

export default InfoEditField;
