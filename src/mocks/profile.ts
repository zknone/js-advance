import type { AvatarCfg, InfoFieldProps, ProfileMods } from '../types/chat';

const baseFields: InfoFieldProps[] = [
  {
    label: 'Почта',
    value: null,
    name: 'email',
    type: 'email',
    placeholder: 'Почта',
    error: null,
  },
  {
    label: 'Логин',
    value: null,
    name: 'login',
    type: 'text',
    placeholder: 'Логин',
    error: null,
  },
  {
    label: 'Имя',
    value: null,
    name: 'first_name',
    type: 'text',
    placeholder: 'Имя',
    error: null,
  },
  {
    label: 'Фамилия',
    value: null,
    name: 'second_name',
    type: 'text',
    placeholder: 'Фамилия',
    error: null,
  },
  {
    label: 'Имя в чате',
    value: null,
    name: 'display_name',
    type: 'text',
    placeholder: 'Имя в чате',
    error: null,
  },
  {
    label: 'Телефон',
    value: null,
    name: 'phone',
    type: 'tel',
    placeholder: 'Телефон',
    error: null,
  },
];

const basePasswordFields: InfoFieldProps[] = [
  {
    label: 'Старый пароль',
    value: null,
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Введите старый пароль',
    error: null,
  },
  {
    label: 'Новый пароль',
    value: null,
    name: 'newPassword',
    type: 'password',
    placeholder: 'Введите старый пароль',
    error: null,
  },
  {
    label: 'Повторите новый пароль',
    value: null,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Введите старый пароль',
    error: null,
  },
];

const avatarMock: AvatarCfg = {
  changeText: 'Поменять аватар',
  iconSrc: '/avatar-replacement-icon.svg',
  iconAlt: 'Заменить аватар',
  iconW: 40,
  iconH: 40,
};

const profileInfoMockEditingCredentials = {
  modalItem: {
    isOpen: false,
    method: 'POST',
    action: '',
    title: 'Загрузите файл',
    submitText: 'Поменять',
    inputId: 'modal-input',
    inputName: 'modalInput',
    labelText: 'Выбрать файл на компьютере',
  },
  mode: 'edit' as ProfileMods,
};

const profileInfoMockEditingPass = {
  infoFields: basePasswordFields,
  mode: 'edit' as ProfileMods,
};

const profileInfoMock = {
  infoFields: basePasswordFields,
  mode: 'edit' as ProfileMods,
};

export {
  baseFields,
  avatarMock,
  basePasswordFields,
  profileInfoMock,
  profileInfoMockEditingCredentials,
  profileInfoMockEditingPass,
};
