import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InfoFieldProps } from '../../types/chat';

/**
 * InfoEditField
 *
 * @param props Props inside: {}
 */
class InfoEditField extends TemplateBlock<InfoFieldProps> {
  constructor(props: InfoFieldProps) {
    const defaultProps: Partial<InfoFieldProps> = {
      settings: {
        withInternalID: true,
      },
    };

    super('infoEditField', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('infoEditField', this.props);
  }
}

export default InfoEditField;
