import type { AdditionalField, BlockBasics } from './core';

export const PAGE = {
  SIGN_UP: 'signupPage',
  LOADING_ERROR: 'loadingErrorPage',
  LOGIN: 'loginPage',
  MAIN: 'mainPage',
  NOT_FOUND: 'notFoundPage',
  PROFILE: 'profilePage',
};

export type PagesTypes = (typeof PAGE)[keyof typeof PAGE];

export type PublicPageProps = BlockBasics<AdditionalField>;

export type WithPage<P extends PublicPageProps> = P & { page: PagesTypes };
