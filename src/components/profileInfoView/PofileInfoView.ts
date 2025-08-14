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

    const tagName = 'section';
    const tagClassName = 'profile-view';

    super(
      'profileInfoView',
      {
        ...defaultProps,
        ...props,
        settings: { withInternalID: true },
      },
      tagName,
      tagClassName
    );
  }

  render(): DocumentFragment {
    const { infoFields } = this.props;

    const viewButtons: CustomButtonProps[] = [
      {
        text: 'Изменить данные',
        type: 'button',
        variant: 'link',
        settings: {
          withInternalID: false,
        },
        events: { click: () => alert('Привет из сендбокса!') },
      },
      {
        text: 'Изменить пароль',
        type: 'button',
        variant: 'link',
        settings: {
          withInternalID: false,
        },
        events: { click: () => alert('Привет из сендбокса!') },
      },
      {
        text: 'Выйти из аккаунта',
        variant: 'link',
        type: 'button',
        color: 'red',
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
