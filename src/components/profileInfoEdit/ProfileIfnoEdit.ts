import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomButtonProps, ProfileInfoModeProps } from '../../types/chat';
import CustomButton from '../customButton/CustomButton';
import InfoEditField from '../infoEditField/InfoEditField';

/**
 * ProfileInfoEdit
 *
 * @param props Props inside: {}
 */

class ProfileInfoEdit extends TemplateBlock<ProfileInfoModeProps> {
  constructor(props: ProfileInfoModeProps) {
    const defaultProps: Partial<ProfileInfoModeProps> = {
      className: '',
    };

    super('profileInfoEdit', {
      ...defaultProps,
      ...props,
      settings: { withInternalID: true },
    });
  }

  render(): DocumentFragment {
    const { infoFields } = this.props;
    const editButtons: CustomButtonProps[] = [
      {
        text: 'Отправить',
        type: 'submit',
        className: 'custom-button',
        settings: {
          withInternalID: false,
        },
        events: {
          click: (e: Event) => {
            e.preventDefault();

            const results = infoFields.reduce((acc, field): Record<string, unknown> => {
              const { label, value } = field;
              acc[label] = value;
              return acc;
            }, {});
            console.log(results);
          },
        },
      },
    ];

    this.children.infoFields = this.props.infoFields.map(
      (infoEditField) => new InfoEditField(infoEditField)
    );

    this.children.buttons = editButtons.map((button) => new CustomButton(button));
    return this.compile('profileInfoEdit', this.props);
  }
}

export default ProfileInfoEdit;
