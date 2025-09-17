import { ROUTES } from '../consts/routes';
import type { MainPageProps } from '../types/pages';

export const mainPageData: MainPageProps = {
  customLink: {
    text: 'Профиль',
    href: ROUTES.settings,
  },
  search: {},
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
  chatList: [],
  query: {
    id: null,
  },
};
