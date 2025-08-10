import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ProfileInfoProps } from '../../types/chat';

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
}

export default ProfileInfo;
