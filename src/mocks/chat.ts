import type { MainPageProps } from '../types/pages';

export const mainPageData: MainPageProps = {
  chatList: [
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    {
      name: 'Илья',
      time: '09:30',
      message: 'Привет!',
      unreadCount: 1,
    },
    {
      name: 'Сергей',
      time: '09:20',
      message: 'Ок',
      unreadCount: 0,
    },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    {
      name: 'Илья',
      time: '09:30',
      message: 'Привет!',
      unreadCount: 1,
    },
    {
      name: 'Сергей',
      time: '09:20',
      message: 'Ок',
      unreadCount: 0,
    },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    {
      name: 'Илья',
      time: '09:30',
      message: 'Привет!',
      unreadCount: 1,
    },
    {
      name: 'Сергей',
      time: '09:20',
      message: 'Ок',
      unreadCount: 0,
    },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    {
      name: 'Илья',
      time: '09:30',
      message: 'Привет!',
      unreadCount: 1,
    },
    {
      name: 'Сергей',
      time: '09:20',
      message: 'Ок',
      unreadCount: 0,
    },
  ],
  messageList: [
    {
      text: 'Привет!',
      time: '10:46',
      isOwn: false,
    },
    {
      isOwn: true,
      text: 'Как дела?',
      time: '10:47',
    },
    {
      image: 'image.png',
      time: '10:48',
      text: '',
      isOwn: false,
    },
  ],
  customLink: {
    text: 'Профиль',
    href: '/profile',
  },
  search: {},
  chatMenu: {
    name: 'Вадим',
  },
  messageQuill: {
    inputItem: {
      value: null,
      variant: 'quill',
      title: null,
      type: 'text',
      placeholder: 'Введите сообщение',
      error: null,
      name: 'message',
    },
    showAttachmentMenu: false,
    attachButton: {
      icon: {
        src: '/attach-icon.svg',
        alt: 'Прикрепить файл',
        width: 32,
        height: 32,
      },
      variant: 'icon',
      text: null,
    },
    attachmentMenu: {
      imgIcon: {
        src: '/img-icon.svg',
        alt: 'Фото и видео',
        width: 22,
        height: 22,
      },
      fileIcon: {
        src: '/file-icon.svg',
        alt: 'Файл',
        width: 22,
        height: 22,
      },
      locationIcon: {
        src: '/location-icon.svg',
        alt: 'Локация',
        width: 22,
        height: 22,
      },
      labels: {
        attach: 'Прикрепить файл',
        photoVideo: 'Фото и видео',
        file: 'Файл',
        location: 'Локация',
        send: 'Отправить',
      },
    },
    sendButton: {
      text: null,
      variant: 'icon',
      icon: {
        src: '/send-icon.svg',
        alt: 'Отправить сообщение',
        width: 28,
        height: 28,
      },
    },
  },
};
