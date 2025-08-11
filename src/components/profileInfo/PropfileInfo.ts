import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ProfileInfoProps } from '../../types/chat';

/**
 * ProfileInfo component for displaying and editing user profile information.
 *
 * @param props Props inside: { className?: string;
 *  mode?: 'view' | 'edit';
 *  fields: Array<{ label: string; value: string }>;
 *  actions: Record<string, { text: string; href: string; variant: string; color: string }>;
 *  avatar?: { changeText: string; iconSrc: string; iconAlt: string; iconW: number; iconH: number };
 *  showModal?: boolean;
 *  modalProps?: Record<string, unknown> }
 */

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  constructor(props: ProfileInfoProps) {
    const defaultProps: Partial<ProfileInfoProps> = {
      className: '',
      mode: 'view',
      fields: [],
      actions: {
        editCredentials: {
          text: 'Изменить данные',
          href: 'profile/edit-credentials',
          variant: 'link',
          color: 'blue',
        },
        editPass: {
          text: 'Изменить пароль',
          href: 'profile/edit-pass',
          variant: 'link',
          color: 'blue',
        },
        logout: {
          text: 'Выйти',
          href: '/',
          variant: 'link',
          color: 'red',
        },
      },
      avatar: {
        changeText: 'Поменять<br />аватар',
        iconSrc: '/avatar-replacement-icon.svg',
        iconAlt: 'Заменить аватар',
        iconW: 40,
        iconH: 40,
      },
      showModal: false,
      modalProps: {},
    };

    super('profileInfo', {
      ...defaultProps,
      ...props,
      settings: { withInternalID: true },
    });
  }

  render(): DocumentFragment {
    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
