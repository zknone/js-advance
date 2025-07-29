import './style.css';
import registerPartials from './utils/registerPartials.ts';
import { renderPage } from './utils/renderPage.ts';

import.meta.glob('./templates/**/**/*.scss', {
  eager: true,
});

const templates = import.meta.glob('./templates/components/**/*.hbs', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

const pages = import.meta.glob('./templates/pages/**/*.hbs', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;

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
    { name: 'Илья', time: '09:30', message: 'Привет!', unreadCount: 1 },
    { name: 'Сергей', time: '09:20', message: 'Ок', unreadCount: 0 },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    { name: 'Илья', time: '09:30', message: 'Привет!', unreadCount: 1 },
    { name: 'Сергей', time: '09:20', message: 'Ок', unreadCount: 0 },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    { name: 'Илья', time: '09:30', message: 'Привет!', unreadCount: 1 },
    { name: 'Сергей', time: '09:20', message: 'Ок', unreadCount: 0 },
    {
      name: 'Екатерина',
      time: '10:49',
      message: 'Изображение',
      unreadCount: 2,
    },
    { name: 'Илья', time: '09:30', message: 'Привет!', unreadCount: 1 },
    { name: 'Сергей', time: '09:20', message: 'Ок', unreadCount: 0 },
  ],

  messages: [
    { text: 'Привет!', time: '10:46' },
    { isOwn: true, text: 'Как дела?', time: '10:47' },
    { image: 'image.png', time: '10:48' },
  ],
};

const profilePageData = {
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

const loginPageData = {
  fields: [
    {
      title: 'Login',
      name: 'login',
      type: 'text',
      placeholder: 'Enter login',
    },
    {
      title: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
    },
  ],
};

const registrationFormData = {
  fields: [
    {
      title: 'Почта',
      name: 'email',
      type: 'email',
      placeholder: 'Введите почту',
    },
    {
      title: 'Логин',
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин',
    },
    {
      title: 'Имя',
      name: 'firstName',
      type: 'text',
      placeholder: 'Введите имя',
    },
    {
      title: 'Фамилия',
      name: 'lastName',
      type: 'text',
      placeholder: 'Введите фамилию',
    },
    {
      title: 'Телефон',
      name: 'phone',
      type: 'tel',
      placeholder: 'Введите номер телефона',
    },
    {
      title: 'Пароль',
      name: 'password',
      type: 'password',
      placeholder: 'Введите пароль',
      error: 'Пароли не совпадают',
    },
    {
      title: 'Пароль (ещё раз)',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Повторите пароль',
      error: 'Пароли не совпадают',
    },
  ],
};

const routes: Record<string, () => void> = {
  main: () => renderPage('mainPage', pages, mainPageData),
  profile: () => renderPage('profilePage', pages, profilePageData),
  login: () => renderPage('loginPage', pages, loginPageData),
  signup: () => renderPage('signupPage', pages, registrationFormData),
  404: () => renderPage('notFoundPage', pages, {}),
  500: () => renderPage('loadingErrorPage', pages, {}),
};

registerPartials(templates);

function getPage() {
  const pathRoute = location.pathname.replace('/', '');

  return routes[pathRoute] || routes['main'];
}

window.addEventListener('hashchange', () => {
  getPage()();
});

getPage()();
