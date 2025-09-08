import { ROUTES } from './consts/routes';
import Router from './core/routerEngine/router';
import TemplateEngine from './core/templateEngine/TemplateEngine';
import { mainPageData } from './mocks/chat';
import { loginFormData } from './mocks/login';
import { baseProfileMocks } from './mocks/profile';
import { signupFormData } from './mocks/signup';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
import LoginPage from './pages/loginPage/LoginPage';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import './style.scss';

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
  .use({ pathname: ROUTES.messenger }, MainPage, mainPageData)
  .use({ pathname: ROUTES.login }, LoginPage, loginFormData)
  .use({ pathname: ROUTES.signup }, LoginPage, signupFormData)
  .use({ pathname: ROUTES[404] }, NotFoundPage)
  .use({ pathname: ROUTES[500] }, LoadingErrorPage)
  .use({ pathname: ROUTES.settings }, ProfilePage, baseProfileMocks)
  .start();

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
  if (!a) return;

  const m = e as MouseEvent;
  const isLeftClick = m.button === 0;
  const hasMods = m.metaKey || m.ctrlKey || m.shiftKey || m.altKey;
  if (!isLeftClick || hasMods || a.target === '_blank' || a.hasAttribute('download')) return;

  const url = new URL(a.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();

  const path = {
    pathname: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
  };

  router.go(path);
});
