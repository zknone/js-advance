import { ROUTES } from './consts/routes';
import TemplateEngine from './core/templateEngine/TemplateEngine';
import { mainPageData } from './mocks/chat';
import { loginFormData } from './mocks/login';
import {
  baseProfileMocks,
  profileInfoMockEditingCredentials,
  profileInfoMockEditingPass,
} from './mocks/profile';
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
  [ROUTES.main]: () => {
    const mainPage = new MainPage(mainPageData);
    renderPage(mainPage);
  },
  [ROUTES.login]: () => {
    const loginPage = new LoginPage(loginFormData);
    renderPage(loginPage);
  },
  [ROUTES.signup]: () => {
    const signupPage = new LoginPage(signupFormData);
    renderPage(signupPage);
  },
  [ROUTES[404]]: () => {
    const notFoundPage = new NotFoundPage({
      customLink: {
        text: 'Назад',
        href: '/',
      },
    });

    renderPage(notFoundPage);
  },
  [ROUTES[500]]: () => {
    const loadingErrorPageItem = new LoadingErrorPage({
      customLink: {
        text: 'Назад',
        href: '/',
      },
    });
    renderPage(loadingErrorPageItem);
  },
  [ROUTES.profile]: () => {
    const profilePage = new ProfilePage(baseProfileMocks);
    renderPage(profilePage);
  },
  [ROUTES.profileEditPass]: () => {
    const profilePage = new ProfilePage(profileInfoMockEditingPass);
    renderPage(profilePage);
  },
  [ROUTES.profileEditCredentials]: () => {
    const profilePage = new ProfilePage(profileInfoMockEditingCredentials);
    renderPage(profilePage);
  },
  [ROUTES.profileEditAvatar]: () => {
    const profileInfoMock = { ...baseProfileMocks, mode: 'edit' as ProfileMods };
    const profilePage = new ProfilePage(profileInfoMock);
    renderPage(profilePage);
  },
};

function getPage() {
  const pathRoute = location.pathname.trim().replace(/^\/|\/$/g, '');
  return routes[pathRoute] || routes[ROUTES[404]];
}

window.addEventListener('popstate', () => getPage()());

getPage()();
