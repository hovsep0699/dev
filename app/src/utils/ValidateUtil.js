import IsEmail from 'isemail';

export const validateEmail = value => {
  return !value || !IsEmail.validate(value, true) ? 'Введите корректную почту' : undefined;
};
export const validateSurname = value => {
  return !value ? 'Введите ФИО' : undefined;
};
export const validateName = value => {
  return !value ? 'Введите ФИО' : undefined;
};
export const validatePassword = value => {
  return !value ? 'Введите пароль' : undefined;
};
export const validateNewPassword = value => {
  return !value || value.length < 8 || value.length > 36
    ? 'Должен быть длиной 8–36 символов'
    : undefined;
};
export const validateMatchPasswords = (value, values) => {
  return values.password && value !== values.password ? 'Пароли не совпадают' : undefined;
};
export const validateCaptcha = value => {
  return !value ? 'Введите код с изображения' : undefined;
};
export const validateOGRN = value => {
  return !value || value.length < 13 || value.length === 14 || value.length > 15
    ? 'Введите число длиной 13 или 15 знаков'
    : undefined;
};
export const validatePosition = value => {
  return !value ? 'Введите Вашу должность' : undefined;
};
