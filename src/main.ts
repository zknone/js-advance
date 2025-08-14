import TemplateEngine from './core/templateEngine/TemplateEngine';
import { basePasswordFields, baseProfileMocks } from './mocks/profile';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
import LoginPage from './pages/loginPage/LoginPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import './style.css';
import type { CustomFormProps, InputItemProps, ProfileMods } from './types/chat';
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

const routes: Record<string, () => void> = {
  main: () => {},
  login: () => {
    const loginFormData: CustomFormProps = {
      title: 'Вход',
      inputFields: [
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
      ],
      customLink: {
        text: 'Нет аккаунта?',
        href: '/signup',
      },
      customButton: {
        text: 'Авторизоваться',
      },
    };

    const loginPage = new LoginPage(loginFormData);
    renderPage(loginPage);
  },
  signup: () => {
    const signupFields: InputItemProps[] = [
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
    ];

    const signupFormData: CustomFormProps = {
      title: 'Регистрация',
      inputFields: signupFields,
      customLink: {
        text: 'Войти',
        href: '/login',
      },
      customButton: {
        text: 'Зарегистрироваться',
      },
    };
    const signupPage = new LoginPage(signupFormData);
    renderPage(signupPage);
  },
  404: () => {
    const notFoundPage = new NotFoundPage({
      customLink: {
        text: 'Назад',
        href: '/',
      },
    });

    renderPage(notFoundPage);
  },
  500: () => {
    const loadingErrorPageItem = new LoadingErrorPage({
      customLink: {
        text: 'Назад',
        href: '/',
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
    const profileInfoMock = {
      ...baseProfileMocks,
      infoFields: basePasswordFields,
      mode: 'edit' as ProfileMods,
    };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
  'profile/edit-credentials': () => {
    const profileInfoMock = {
      ...baseProfileMocks,
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
  const pathRoute = location.pathname.trim().replace(/^\/|\/$/g, '');
  return routes[pathRoute] || routes.main;
}

window.addEventListener('hashchange', () => getPage()());

getPage()();
