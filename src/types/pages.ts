import type {
  ChatItemProps,
  ChatMenuProps,
  CustomButtonProps,
  CustomLinkProps,
  InputItemProps,
  MessageItemProps,
  MessageQuillProps,
  SearchProps,
} from './chat';
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

export type WithPage<P extends PublicPageProps> = P & {
  page: PagesTypes;
  tagName: string;
  tagClassName: string;
};

export interface MainPageProps extends AdditionalField {
  customLink: CustomLinkProps;
  search: SearchProps;
  chatMenu?: ChatMenuProps;
  chatList?: ChatItemProps[];
  messageList?: Record<number, MessageItemProps>;
  messageQuill: MessageQuillProps;
  query: {
    id: string | null | string;
  };
}

export interface LoginPageFormProps extends AdditionalField {
  title: string;
  customButton: CustomButtonProps;
  inputFields: InputItemProps[];
  customLink: CustomLinkProps;
}
