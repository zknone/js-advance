import type { AdditionalField } from '../../../types/core';

interface INewUser extends AdditionalField {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface INewUserResponse extends AdditionalField {
  id: number;
}

interface ILogin extends AdditionalField {
  login: string;
  password: string;
}

interface ILoggedUser extends AdditionalField {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
}

interface IProfile extends AdditionalField {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

interface IPassword extends AdditionalField {
  oldPassword: string;
  newPassword: string;
}

interface IApiError {
  reason: string;
}

interface IChat extends AdditionalField {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

interface IFilesSent extends AdditionalField {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string;
  content: number | number[];
  file: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: 'image/jpeg';
    content_size: number;
    upload_date: string;
  };
}

interface IUser extends AdditionalField {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}

interface IToken extends AdditionalField {
  token: string;
}
export type {
  INewUser,
  ILogin,
  ILoggedUser,
  IProfile,
  IPassword,
  INewUserResponse,
  IApiError,
  IChat,
  IFilesSent,
  IUser,
  IToken,
};
