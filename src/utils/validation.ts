type Fields =
  | 'first_name'
  | 'second_name'
  | 'message'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'display_name'
  | 'oldPassword'
  | 'newPassword'
  | 'confirmPassword';

const nameRegExp = /^(?:[A-Z][A-Za-z]*(?:-[A-Za-z]+)*|[А-ЯЁ][А-ЯЁа-яё]*(?:-[А-ЯЁа-яё]+)*)$/u;
const loginRegExp = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/;
const emailRegExp = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]*[A-Za-z]+\.[A-Za-z]{2,}$/;
const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
const messageRegExp = /^.+$/;
const phoneRegExp = /^\+?\d{10,15}$/;

const checkRegExp = (value: unknown, regExp: RegExp) => {
  if (typeof value === 'string') {
    return regExp.test(value);
  }
  throw new Error(`${value} is not a string`);
};
const validateInput = (value: unknown, field: unknown): boolean => {
  if (value === null) return false;
  const allowed: Fields[] = [
    'first_name',
    'second_name',
    'message',
    'login',
    'email',
    'password',
    'phone',
    'display_name',
    'oldPassword',
    'newPassword',
    'confirmPassword',
  ];

  if (!allowed.includes(field as Fields)) {
    throw new Error(`there is no such ${field}`);
  }
  if (field === 'first_name' || field === 'second_name' || field === 'display_name') {
    return checkRegExp(value, nameRegExp);
  }
  if (field === 'login') {
    return checkRegExp(value, loginRegExp);
  }
  if (field === 'email') {
    return checkRegExp(value, emailRegExp);
  }
  if (field === 'message') {
    return checkRegExp(value, messageRegExp);
  }
  if (
    field === 'password' ||
    field === 'newPassword' ||
    field === 'oldPassword' ||
    field === 'confirmPassword'
  ) {
    return checkRegExp(value, passwordRegExp);
  }
  if (field === 'phone') {
    return checkRegExp(value, phoneRegExp);
  }

  return false;
};

export { validateInput };
