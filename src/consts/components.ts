import type { CustomFormProps } from '../types/chat';

const chatMenuIcons = {
  menu: {
    src: '/menu-icon.svg',
    alt: 'Открыть меню',
    width: 3,
    height: 15,
  },
  addBg: {
    src: '/add-icon.svg',
    alt: 'Фон иконки добавления',
    width: 22,
    height: 22,
  },
  addCross: {
    src: '/add-cross.svg',
    alt: 'Иконка добавления',
    width: 11,
    height: 11,
  },
  deleteBg: {
    src: '/delete-icon.svg',
    alt: 'Фон иконки удаления',
    width: 22,
    height: 22,
  },
  deleteCross: {
    src: '/delete-cross.svg',
    alt: 'Иконка удаления',
    width: 11,
    height: 11,
  },
  addAvatar: {
    src: '/img-icon.svg',
    alt: 'Фон иконки удаления',
    width: 22,
    height: 22,
  },
  deleteChat: {
    src: '/location-icon.svg',
    alt: 'Иконка удаления',
    width: 11,
    height: 11,
  },
};

const chatMenuLabels = {
  openMenu: 'Открыть меню',
  addUser: 'Добавить пользователя',
  deleteUser: 'Удалить пользователя',
  addAvatar: 'Установить аватар',
  deleteChat: 'Удалить чат',
};

const chatMenuAddButtonProps = {
  type: 'input',
  title: 'Добавить нового пользователя',
  submitText: 'Добавить',
  inputId: 'user',
  inputName: 'user',
  labelText: 'Пользователь',
};

const chatMenuDeleteButtonProps = {
  type: 'input',
  title: 'Удалить пользователя',
  submitText: 'Удалить',
  inputId: 'user',
  inputName: 'user',
  labelText: 'Пользователь',
};

const chatMenuAvatarButtonProps = {
  type: 'avatar',
  title: 'Загрузить аватар чата',
  submitText: 'Сохранить',
  inputId: 'avatar',
  inputName: 'avatar',
  labelText: 'Выберите файл',
};

const chatMenuDeleteChatButtonProps = {
  type: 'yesNo',
  title: 'Удалить чат',
  submitText: 'Удалить',
  inputId: 'chat',
  inputName: 'chat',
  labelText: 'Напишите "Да", чтобы подтвердить',
};

const chatMenuDefaultProps = {
  chat: {
    id: 0,
    name: 'Error',
    avatar: null,
    createdBy: 0,
    lastMessage: null,
  },
  menuOpened: false,
  modalOpen: null,
  labels: chatMenuLabels,
  icons: chatMenuIcons,
  settings: {
    withInternalID: true,
  },
};

const newChatFormProps: CustomFormProps = {
  title: 'Создание чата',
  customButton: {
    text: 'Создать',
    type: 'submit',
  },
  inputFields: [
    {
      value: '',
      title: 'Создайте чат',
      type: 'text',
      placeholder: 'Введите название нового чата',
      error: null,
      name: 'title',
      variant: 'regular',
    },
  ],
  settings: {
    withInternalID: true,
  },
};

export {
  chatMenuIcons,
  chatMenuLabels,
  chatMenuAddButtonProps,
  chatMenuDeleteButtonProps,
  chatMenuAvatarButtonProps,
  chatMenuDeleteChatButtonProps,
  chatMenuDefaultProps,
  newChatFormProps,
};
