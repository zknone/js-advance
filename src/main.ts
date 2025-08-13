import TemplateEngine from './core/templateEngine/TemplateEngine';
import { baseProfileMocks } from './mocks/profile';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import './style.css';
import type { InputItemProps, ProfileMods } from './types/chat';
import renderPage from './utils/renderPage';

import.meta.glob('./components/**/*.scss', {
  eager: true,
});

import.meta.glob('./pages/**/*.scss', {
  eager: true,
});

const templates = import.meta.glob('./components/**/*.hbs', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

const pages = import.meta.glob('./pages/**/*.hbs', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

TemplateEngine.init(templates, pages);

const mainPageData = {
  noChat: false,
  hasChat: true,

  name: 'Андрей',

  fields: [
    { label: 'Почта', value: 'andrey@mail.ru' },
    { label: 'Телефон', value: '+7 (912) 123‑45‑67' },
  ],

  chats: [
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

  messages: [
    { text: 'Привет!', time: '10:46' },
    { isOwn: true, text: 'Как дела?', time: '10:47' },
    { image: 'image.png', time: '10:48' },
  ],
};

const profilePageData = {
  mode: 'view',
  name: 'Иван',
  fields: [
    { label: 'Почта', value: 'ivanov@mail.ru' },
    { label: 'Логин', value: 'ivanivanov' },
    { label: 'Имя', value: 'Иван' },
    { label: 'Фамилия', value: 'Иванов' },
    { label: 'Имя в чате', value: 'Иван' },
    { label: 'Телефон', value: '+7 (912) 123‑45‑67' },
  ],
};

const editCredentialsPageData = {
  mode: 'edit',
  name: 'Иван',
  fields: [
    {
      label: 'Почта',
      value: 'ivanov@mail.ru',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Логин',
      value: 'ivanivanov',
      name: 'login',
      type: 'text',
    },
    {
      label: 'Имя',
      value: 'Иван',
      name: 'first_name',
      type: 'text',
    },
    {
      label: 'Фамилия',
      value: 'Иванов',
      name: 'second_name',
      type: 'text',
    },
    {
      label: 'Имя в чате',
      value: 'Иван',
      name: 'display_name',
      type: 'text',
    },
    {
      label: 'Телефон',
      value: '+7 (912) 123‑45‑67',
      name: 'phone',
      type: 'tel',
    },
  ],
};

const loginPageData: InputItemProps[] = [
  {
    title: 'Login',
    name: 'login',
    type: 'text',
    placeholder: 'Enter login',
    error: '',
  },
  {
    title: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    error: '',
  },
];

const routes: Record<string, () => void> = {
  main: () => {},
  login: () => {},
  signup: () => {},
  404: () => {
    const notFoundPage = new NotFoundPage({
      customLink: {
        text: 'Назад',
        link: '/',
      },
    });

    renderPage(notFoundPage);
  },
  500: () => {
    const loadingErrorPageItem = new LoadingErrorPage({
      customLink: {
        text: 'Назад',
        link: '/',
      },
    });
    renderPage(loadingErrorPageItem);
  },
  profile: () => {
    const profileInfoMock = { ...baseProfileMocks, mode: 'view' as ProfileMods };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
  'profile/edit-pass': () => {
    const profileInfoMock = { ...baseProfileMocks, mode: 'edit' as ProfileMods };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
  'profile/edit-credentials': () => {
    const profileInfoMock = { ...baseProfileMocks, mode: 'edit' as ProfileMods };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
  'profile/edit-avatar': () => {
    const profileInfoMock = { ...baseProfileMocks, mode: 'edit' as ProfileMods };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
};

function getPage() {
  const pathRoute = location.pathname.replace('/', '');
  return routes[pathRoute.replace('/', '')] || routes.main;
}

window.addEventListener('hashchange', () => getPage()());

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.closest('.profile-info__avatar')) {
    document.getElementById('avatarModal')?.classList.add('open');
  }

  if (target.closest('.modal__close-button')) {
    document.getElementById('avatarModal')?.classList.remove('open');
  }
});

getPage()();
