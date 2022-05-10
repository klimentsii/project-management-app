export enum PasswordPlaceholdersRU {
  default = 'Введите пароль',
  valid = 'Пароль валиден',
  invalid = 'Ваш пароль недостаточно безопасен',
  short = '(минимум 8 символов)',
  case = '(Должен содержать буквы нижнего и верхнего региста)',
  mixture = '(Должен содержать буквы и числа)',
  specialChar = '(Должен включать специальные символы, e.g., ! @ # ? ])',
}

export enum EmailPlaceholdersRU {
  default = 'Введите Вашу почту',
  valid = 'Почта корректна',
  invalid = 'Почта не корректна',
}

export enum RepeatedPasswordPlaceholdersRU {
  default = 'Please repeat the login password',
  valid = 'The password is valid',
  invalid = 'The passwords must match',
}

export enum UserNamePlaceholdersRU {
  default = 'Please enter a name',
  valid = 'The name is valid',
  invalid = 'The name is invalid',
}
