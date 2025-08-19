import TemplateEngine from './core/templateEngine/TemplateEngine';
import { mainPageData } from './mocks/chat';
import { loginFormData } from './mocks/login';
import { basePasswordFields, baseProfileMocks } from './mocks/profile';
import { signupFormData } from './mocks/signup';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
import LoginPage from './pages/loginPage/LoginPage';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import './style.css';
import type { ProfileMods } from './types/chat';
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
  main: () => {
    const mainPage = new MainPage(mainPageData);
    renderPage(mainPage);
  },
  login: () => {
    const loginPage = new LoginPage(loginFormData);
    renderPage(loginPage);
  },
  signup: () => {
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
