import userController from '../../controllers/user/userController';
import type { ILoggedUser, IPassword, IProfile } from '../../core/api/interfaces';
import store from '../../core/store/store';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields, basePasswordFields } from '../../mocks/profile';
import type { ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import type { IStore } from '../../types/store';
import getDataFromInputs from '../../utils/getDataFromInputs';
import ModalItem from '../modalItem/ModalItem';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import ProfileInfoView from '../profileInfoView/ProfileInfoView';

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  private subscribe?: () => void;

  constructor(props: ProfilePageProps) {
    const defaultProps: ProfileInfoProps = {
      infoFields: baseFields,
      name: typeof props.name === 'string' ? props.name : 'Ошибка',
      settings: { withInternalID: true },
      query: { editing: null },
    };
    const tagName = 'section';
    const tagClassName = 'profile-info';

    super(
      'profileInfo',
      {
        ...defaultProps,
        ...props,
      },
      tagName,
      tagClassName
    );

    this.subscribe = store.subscribe((state: IStore) => {
      const user = state?.user;
      if (!user) return;

      const fields = [...defaultProps.infoFields].map((item) => {
        const { name } = item;
        return {
          ...item,
          value:
            user[name as keyof ILoggedUser] !== null
              ? String(user[name as keyof ILoggedUser])
              : null,
        };
      });
      this.setProps({
        ...this.props,
        name: `${user.second_name ?? ''} ${user.first_name ?? ''}`.trim(),
        infoFields: fields,
      });
    });
  }

  destroy() {
    this.subscribe?.();
    super.destroy?.();
  }

  render(): DocumentFragment {
    const mode = this.props.query?.editing;

    const { modalItem } = this.props;

    const isPass = mode === 'pass';

    if (modalItem) {
      this.children.modalItem = new ModalItem(modalItem);
    }

    const handleChangeProfile = () => {
      const data = getDataFromInputs('profile-info-form');
      if (isPass) {
        userController.changePassword(data as IPassword);
      } else {
        userController.changeProfile(data as IProfile);
      }
    };

    const formProps = !isPass
      ? { ...this.props, onSubmit: handleChangeProfile }
      : { ...this.props, infoFields: basePasswordFields, onSubmit: handleChangeProfile };

    this.children.infoFields = mode
      ? new ProfileInfoEdit(formProps)
      : new ProfileInfoView(this.props);

    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
