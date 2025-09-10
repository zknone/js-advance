import type { ILoggedUser } from '../../core/api/interfaces';
import store from '../../core/store/store';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields } from '../../mocks/profile';
import type { ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import type { IStore } from '../../types/store';
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

      const fields = [...baseFields].map((item) => {
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
    const isEditing = this.props.mode === 'edit';

    const { modalItem } = this.props;

    if (modalItem) {
      this.children.modalItem = new ModalItem(modalItem);
    }

    this.children.infoFields = isEditing
      ? new ProfileInfoEdit(this.props)
      : new ProfileInfoView(this.props);

    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
