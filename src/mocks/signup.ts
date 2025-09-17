import type { CustomFormProps, InputItemProps } from '../types/chat';

const signupFields: InputItemProps[] = [
  {
    title: 'Почта',
    name: 'email',
    type: 'email',
    placeholder: 'Введите почту',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Логин',
    name: 'login',
    type: 'text',
    placeholder: 'Введите логин',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Имя',
    name: 'first_name',
    type: 'text',
    placeholder: 'Введите имя',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Фамилия',
    name: 'second_name',
    type: 'text',
    placeholder: 'Введите фамилию',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Имя в чате',
    name: 'nicname',
    type: 'text',
    placeholder: 'Введите имя для отображения в чате',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Телефон',
    name: 'phone',
    type: 'tel',
    placeholder: 'Введите номер телефона',
    error: null,
    variant: 'regular',
    value: null,
  },
  {
    title: 'Пароль',
    name: 'password',
    type: 'password',
    placeholder: 'Введите пароль',
    error: 'Пароли не совпадают',
    variant: 'regular',
    value: null,
  },
  {
    title: 'Пароль (ещё раз)',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Повторите пароль',
    error: 'Пароли не совпадают',
    variant: 'regular',
    value: null,
  },
];

const signupFormData: CustomFormProps = {
  title: 'Регистрация',
  inputFields: signupFields,
  customLink: {
    text: 'Войти',
    href: '/',
  },
  customButton: {
    text: 'Зарегистрироваться',
    type: 'submit',
  },
};

export { signupFormData };
