import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InfoFieldProps } from '../../types/chat';

/**
 * InfoViewField
 *
 * @param props Props inside: {}
 */
class InfoViewField extends TemplateBlock<InfoFieldProps> {
  constructor(props: InfoFieldProps) {
    const defaultProps: Partial<InfoFieldProps> = {
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'div';
    const tagClassName = 'profile-info-row';

    super(
      'infoViewField',
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
    return this.compile('infoViewField', this.props);
  }
}

export default InfoViewField;
