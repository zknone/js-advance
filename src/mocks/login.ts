import type { CustomFormProps } from '../types/chat';

export const loginFormData: CustomFormProps = {
  title: 'Вход',
  inputFields: [
    {
      title: 'Login',
      name: 'login',
      type: 'text',
      placeholder: 'Enter login',
      error: '',
    },
    {
      title: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      error: '',
    },
  ],
  customLink: {
    text: 'Нет аккаунта?',
    href: '/signup',
  },
  customButton: {
    text: 'Авторизоваться',
  },
};
