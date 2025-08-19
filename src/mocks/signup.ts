import type { CustomFormProps, InputItemProps } from '../types/chat';

const signupFields: InputItemProps[] = [
  {
    title: 'Почта',
    name: 'email',
    type: 'email',
    placeholder: 'Введите почту',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Логин',
    name: 'login',
    type: 'text',
    placeholder: 'Введите логин',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Имя',
    name: 'first_name',
    type: 'text',
    placeholder: 'Введите имя',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Фамилия',
    name: 'second_name',
    type: 'text',
    placeholder: 'Введите фамилию',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Имя в чате',
    name: 'nicname',
    type: 'text',
    placeholder: 'Введите имя для отображения в чате',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Телефон',
    name: 'phone',
    type: 'tel',
    placeholder: 'Введите номер телефона',
    error: null,
    variant: 'regular',
  },
  {
    title: 'Пароль',
    name: 'password',
    type: 'password',
    placeholder: 'Введите пароль',
    error: 'Пароли не совпадают',
    variant: 'regular',
  },
  {
    title: 'Пароль (ещё раз)',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Повторите пароль',
    error: 'Пароли не совпадают',
    variant: 'regular',
  },
];

const signupFormData: CustomFormProps = {
  title: 'Регистрация',
  inputFields: signupFields,
  customLink: {
    text: 'Войти',
    href: '/login',
  },
  customButton: {
    text: 'Зарегистрироваться',
  },
};

export { signupFormData };
