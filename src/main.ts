import TemplateEngine from './core/templateEngine/TemplateEngine';
import { baseProfileMocks } from './mocks/profile';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
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
  const pathRoute = location.pathname.trim().replace(/^\/|\/$/g, '');
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
