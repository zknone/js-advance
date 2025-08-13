import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomButtonProps, ProfileInfoModeProps } from '../../types/chat';
import CustomButton from '../customButton/CustomButton';
import InfoViewField from '../infoViewField/InfoViewField';

/**
 * ProfileInfoEdit
 *
 * @param props Props inside: {}
 */

class ProfileInfoView extends TemplateBlock<ProfileInfoModeProps> {
  constructor(props: ProfileInfoModeProps) {
    const defaultProps: Partial<ProfileInfoModeProps> = {
      className: '',
    };

    super('profileInfoView', {
      ...defaultProps,
      ...props,
      settings: { withInternalID: true },
    });
  }

  render(): DocumentFragment {
    const { infoFields } = this.props;

    const viewButtons: CustomButtonProps[] = [
      {
        text: 'Отправить',
        type: 'button',
        className: 'custom-button',
        settings: {
          withInternalID: false,
        },
        events: { click: () => alert('Привет из сендбокса!') },
      },
      {
        text: 'Отправить',
        type: 'button',
        className: 'custom-button',
        settings: {
          withInternalID: false,
        },
        events: { click: () => alert('Привет из сендбокса!') },
      },
      {
        text: 'Отправить',
        type: 'button',
        className: 'custom-button',
        settings: {
          withInternalID: false,
        },
        events: { click: () => alert('Привет из сендбокса!') },
      },
    ];

    if (infoFields) {
      this.children.infoFields = this.props.infoFields.map(
        (infoViewField) => new InfoViewField(infoViewField)
      );
    }
    if (viewButtons) {
      this.children.buttons = viewButtons.map((button) => new CustomButton(button));
    }

    return this.compile('profileInfoView', this.props);
  }
}

export default ProfileInfoView;
