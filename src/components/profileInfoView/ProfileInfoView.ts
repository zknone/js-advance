import { ROUTES } from '../../consts/routes';
import userController from '../../controllers/user/userController';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomButtonProps, ProfileInfoModeProps } from '../../types/chat';
import CustomButton from '../customButton/CustomButton';
import InfoViewField from '../infoViewField/InfoViewField';

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
        path: {
          pathname: ROUTES.settings,
          query: {
            editing: 'credentials',
          },
        },
        settings: {
          withInternalID: false,
        },
      },
      {
        text: 'Изменить пароль',
        type: 'button',
        variant: 'link',
        path: {
          pathname: ROUTES.settings,
          query: {
            editing: 'pass',
          },
        },
        settings: {
          withInternalID: false,
        },
      },
      {
        text: 'Выйти',
        variant: 'link',
        type: 'button',
        path: {
          pathname: ROUTES.login,
        },
        onClick() {
          userController.logOut();
        },
        color: 'red',
        settings: {
          withInternalID: false,
        },
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
