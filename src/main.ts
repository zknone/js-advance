import { ROUTES } from './consts/routes';
import Router from './core/routerEngine/router';
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
import './style.scss';
import type { ProfileMods } from './types/chat';

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

const router = new Router('#app');

TemplateEngine.init(templates, pages);

router
  .use({ pathname: ROUTES.main, query: {} }, MainPage, mainPageData)
  .use({ pathname: ROUTES.login, query: {} }, LoginPage, loginFormData)
  .use({ pathname: ROUTES.signup, query: {} }, LoginPage, signupFormData)
  .use({ pathname: ROUTES[404], query: {} }, NotFoundPage, {
    customLink: {
      text: 'Назад',
      href: '/',
    },
  })
  .use({ pathname: ROUTES[500], query: {} }, LoadingErrorPage, {
    customLink: {
      text: 'Назад',
      href: '/',
    },
  })
  .use({ pathname: ROUTES.profile, query: {} }, ProfilePage, baseProfileMocks)
  .use({ pathname: ROUTES.profileEditPass, query: {} }, ProfilePage, profileInfoMockEditingPass)
  .use(
    { pathname: ROUTES.profileEditCredentials, query: {} },
    ProfilePage,
    profileInfoMockEditingCredentials
  )
  .use({ pathname: ROUTES.profileEditAvatar, query: {} }, ProfilePage, {
    ...baseProfileMocks,
    mode: 'edit' as ProfileMods,
  })
  .start();
