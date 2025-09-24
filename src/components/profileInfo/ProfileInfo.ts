import { API_BASE_URL } from '../../consts/api';
import userController from '../../services/user/userService';
import store from '../../core/store/store';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields, basePasswordFields } from '../../consts/profile';
import type { ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import type { IStore } from '../../types/store';
import getDataFromInputs from '../../utils/getDataFromInputs';
import ModalItem from '../modalItem/ModalItem';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import ProfileInfoView from '../profileInfoView/ProfileInfoView';
import type { ILoggedUser, IPassword, IProfile } from '../../types/api';
import trim from '../../utils/trim';

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  private subscribe?: () => void;

  private isOpened = false;

  private mountCtl = new AbortController();

  constructor(props: ProfilePageProps) {
    const defaultProps: ProfileInfoProps = {
      infoFields: baseFields,
      name: typeof props.name === 'string' ? props.name : 'Ошибка',
      settings: { withInternalID: true },
      query: { editing: 'view' },
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
      const { query } = state;

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
        name: trim(`${user.second_name ?? ''} ${user.first_name ?? ''}`),
        infoFields: fields,
        avatar: {
          changeText: 'Аватар',
          iconSrc: `${API_BASE_URL}/resources${user.avatar}`,
          iconAlt: user.avatar ?? '',
        },
        query,
      });
    });
  }

  componentDidMount(): void {
    this.mountCtl.abort();
    this.mountCtl = new AbortController();
    const avatarDiv = document.querySelector<HTMLDivElement>('.profile-info__avatar');
    avatarDiv?.addEventListener('click', this.handleOpenModal, { signal: this.mountCtl.signal });
  }

  destroy() {
    this.subscribe?.();
    super.destroy?.();
    this.mountCtl.abort();
  }

  private handleOpenModal = (e: MouseEvent): void => {
    e.stopPropagation();

    this.openModal();

    if (this.isOpened) {
      document.addEventListener('click', this.handleOutsideModalClick, {
        signal: this.mountCtl.signal,
      });
    } else {
      document.removeEventListener('click', this.handleOutsideModalClick);
    }
  };

  private handleOutsideModalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest('.modal') && !target.closest('.profile-info__avatar')) {
      this.closeModal();
    }
  };

  openModal() {
    this.isOpened = true;
    this.setProps({ ...this.props, menuOpened: true });
    document.removeEventListener('click', this.handleOpenModal);
  }

  closeModal() {
    this.isOpened = false;
    this.setProps({ ...this.props, menuOpened: false });
    const avatarDiv = document.querySelector<HTMLDivElement>('.profile-info__avatar');
    document.removeEventListener('click', this.handleOutsideModalClick);
    avatarDiv?.addEventListener('click', this.handleOpenModal);
  }

  render(): DocumentFragment {
    const { query } = store.getState();

    const mode = query?.editing ?? null;

    const isView = mode === 'view';
    const isPass = mode === 'pass';
    const isCreds = mode === 'credentials';

    this.children.modalItem = new ModalItem({
      method: 'PUT',
      action: '123',
      title: 'Заменим аватар',
      submitText: 'Сохранить',
      inputId: 'avatar',
      inputName: 'Аватар',
      labelText: 'добавьте аватарку',
      type: 'avatar',
      isOpen: Boolean(this.props.menuOpened),
      onSubmit: (e: Event) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>(
          'input[type="file"]'
        );
        const file = input?.files?.[0];
        if (file) {
          userController.changeAvatar(file);
        }
        this.closeModal();
      },
    });

    const handleChangeProfile = () => {
      const data = getDataFromInputs('profile-info-form');
      if (isPass) {
        userController.changePassword(data as IPassword);
      } else if (isCreds) {
        userController.changeProfile(data as IProfile);
      }
    };

    const formProps =
      !isView && !isPass
        ? { ...this.props, onSubmit: handleChangeProfile }
        : { ...this.props, infoFields: basePasswordFields, onSubmit: handleChangeProfile };

    this.children.infoFields = !isView
      ? new ProfileInfoEdit(formProps)
      : new ProfileInfoView(this.props);

    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
