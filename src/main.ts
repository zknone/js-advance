import ChatItem from './components/chatItem/ChatItem';
import ChatList from './components/chatList/ChatList';
import CustomButton from './components/customButton/CustomButton';
import TemplateEngine from './core/templateEngine/TemplateEngine';
import './style.css';
import renderComponentSomewhere from './utils/renderCompopentsSomewhere';

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

const editPassPageData = {
  mode: 'edit',
  name: 'Иван',
  fields: [
    {
      label: 'Старый пароль',
      name: 'oldPassword',
      type: 'text',
      placeholder: 'Введите старый пароль',
    },
    {
      label: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      placeholder: 'Введите новый пароль',
    },
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
      name: 'first_name',
      type: 'text',
      placeholder: 'Введите имя',
    },
    {
      title: 'Фамилия',
      name: 'second_name',
      type: 'text',
      placeholder: 'Введите фамилию',
    },
    {
      title: 'Имя в чате',
      name: 'nicname',
      type: 'text',
      placeholder: 'Введите имя для отображения в чате',
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
      name: 'confirm_password',
      type: 'password',
      placeholder: 'Повторите пароль',
      error: 'Пароли не совпадают',
    },
  ],
};

const templateEngine = TemplateEngine.init(templates, pages);

const routes: Record<string, () => void> = {
  main: () => templateEngine.renderPage('mainPage', mainPageData),
  profile: () => templateEngine.renderPage('profilePage', profilePageData),
  login: () => templateEngine.renderPage('loginPage', loginPageData),
  signup: () => templateEngine.renderPage('signupPage', registrationFormData),
  404: () => templateEngine.renderPage('notFoundPage', {}),
  500: () => templateEngine.renderPage('loadingErrorPage', {}),
  sandbox: () => {
    const root = document.getElementById('app');

    if (root) {
      templateEngine.renderPage('sandBoxPage', {});

      const button = new CustomButton({
        text: 'Нажми меня',
        type: 'button',
        className: 'new-button',
        events: {
          click: () => alert('Привет из сендбокса!'),
        },
      });

      const message = {
        name: 'Иван',
        message: '123',
        time: '123',
        className: '123',
        events: {
          click: () => alert('Привет из сендбокса!'),
        },
      };

      const messageFirst = {
        name: 'Иван',
        message: '1212121213',
        time: '123',
        className: '123',
        events: {
          click: () => alert('Привет из сендбокса!'),
        },
      };

      const messageSecond = {
        name: 'Ивsdsdан',
        message: '1121sxs23',
        time: '123',
        className: '1212123',
        events: {
          click: () => alert('Привет из сендбокса!'),
        },
      };

      const messageItem = new ChatItem(message);

      const listItem = new ChatList({ chats: [messageFirst, messageSecond] });

      const sandboxPage = document.querySelector('.sandbox-page');
      if (sandboxPage) {
        renderComponentSomewhere('.sandbox-page', button);
        renderComponentSomewhere('.sandbox-page', messageItem);
        renderComponentSomewhere('.sandbox-page', listItem);
      }
    }
  },
  'profile/edit-pass': () => templateEngine.renderPage('editPassPage', editPassPageData),
  'profile/edit-credentials': () =>
    templateEngine.renderPage('editCredentialsPage', editCredentialsPageData),
  'profile/edit-avatar': () => templateEngine.renderPage('profilePage', editPassPageData),
};

function getPage() {
  const pathRoute = location.pathname.replace('/', '');

  return routes[pathRoute] || routes.main;
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
