export const PAGE = {
  SIGN_UP: 'signupPage',
  EDIT_CREDENTIALS: 'editCredentialsPage',
  EDIT_PASS: 'editPassPage',
  LOADING_ERROR: 'loadingErrorPage',
  LOGIN: 'loginPage',
  MAIN: 'mainPage',
  NOT_FOUND: 'notFoundPage',
  PROFILE: 'profilePage',
};

export type PagesTypes = (typeof PAGE)[keyof typeof PAGE];
