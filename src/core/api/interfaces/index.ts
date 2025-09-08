import type { AdditionalField } from '../../../types/core';

interface INewUser extends AdditionalField {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface ILogin extends AdditionalField {
  login: string;
  password: string;
}

interface ILoggedUser extends AdditionalField {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
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
export type { INewUser, ILogin, ILoggedUser, IProfile, IPassword };
