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
      value: null,
      variant: 'regular',
    },
    {
      title: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      error: '',
      value: null,
      variant: 'regular',
    },
  ],
  customLink: {
    text: 'Нет аккаунта?',
    href: '/signup',
  },
  customButton: {
    text: 'Авторизоваться',
    type: 'submit',
  },
};
