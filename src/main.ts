import { ROUTES } from './consts/routes';
import userController from './controllers/user/userController';
import router from './core/routerEngine/router';
import TemplateEngine from './core/templateEngine/TemplateEngine';
import LoadingErrorPage from './pages/loadingErrorPage/LoadingErrorPage';
import LoginPage from './pages/loginPage/LoginPage';
import MainPage from './pages/mainPage/mainPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import SignupPage from './pages/signupPage/SignupPage';
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

TemplateEngine.init(templates, pages);

try {
  await userController.fetchMe();
} finally {
  router
    .use({ pathname: ROUTES.login }, LoginPage)
    .use({ pathname: ROUTES.messenger, protected: true }, MainPage)
    .use({ pathname: ROUTES.signup }, SignupPage)
    .use({ pathname: ROUTES[404] }, NotFoundPage)
    .use({ pathname: ROUTES[500] }, LoadingErrorPage)
    .use({ pathname: ROUTES.settings, protected: true }, ProfilePage)
    .start();
}
