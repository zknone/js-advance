import type { MainPageProps } from '../types/pages';

export const mainPageData: Omit<MainPageProps, 'messageQuill'> = {
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
  messageQuill: {},
};
