import type { AvatarCfg, InfoFieldProps, ProfileInfoProps } from '../types/chat';

const baseFields: InfoFieldProps[] = [
  {
    label: 'Почта',
    value: 'ivanov@mail.ru',
    name: 'email',
    type: 'email',
    placeholder: 'Почта',
  },
  {
    label: 'Логин',
    value: 'ivanivanov',
    name: 'login',
    type: 'text',
    placeholder: 'Логин',
  },
  {
    label: 'Имя',
    value: 'Иван',
    name: 'first_name',
    type: 'text',
    placeholder: 'Имя',
  },
  {
    label: 'Фамилия',
    value: 'Иванов',
    name: 'second_name',
    type: 'text',
    placeholder: 'Фамилия',
  },
  {
    label: 'Имя в чате',
    value: 'Иван',
    name: 'display_name',
    type: 'text',
    placeholder: 'Имя в чате',
  },
  {
    label: 'Телефон',
    value: '+7 (912) 123‑45‑67',
    name: 'phone',
    type: 'tel',
    placeholder: 'Телефон',
  },
];

const avatarMock: AvatarCfg = {
  changeText: 'Поменять аватар',
  iconSrc: '/avatar-replacement-icon.svg',
  iconAlt: 'Заменить аватар',
  iconW: 40,
  iconH: 40,
};

const baseProfileMocks: Omit<ProfileInfoProps, 'infoFields'> = {
  className: '',
  userName: 'Иван Стрельцов',
  avatar: avatarMock,
};

export { baseFields, avatarMock, baseProfileMocks };
