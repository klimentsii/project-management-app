import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  EmailPlaceholders,
  PasswordPlaceholders,
  RepeatedPasswordPlaceholders,
  UserNamePlaceholders,
} from './placeholder.enum';
import {
  EmailPlaceholdersRU,
  PasswordPlaceholdersRU,
  RepeatedPasswordPlaceholdersRU,
  UserNamePlaceholdersRU,
} from './placeholder.enum.ru';

export type PlaceTypes = 'default' | 'valid' | 'invalid';

export const isEnglish = () => {
  return localStorage.getItem('lang') !== 'ru';
};

export const myValidatorForPassword = (control: AbstractControl): ValidationErrors | null => {
  const arrLetters = Array.from(control.value) as string[];
  const placeholder = isEnglish() ? PasswordPlaceholders : PasswordPlaceholdersRU;

  if (control.value.length < 8) {
    return { message: placeholder.invalid + placeholder.short };
  }
  if (
    !arrLetters.some(letter => letter === letter.toLowerCase()) ||
    !arrLetters.some(letter => letter === letter.toUpperCase())
  ) {
    return { message: placeholder.invalid + placeholder.case };
  }
  if (!/[!@#\$%\^&\*\+]/.test(control.value)) {
    return { message: placeholder.invalid + placeholder.specialChar };
  }
  if (!/\d/.test(control.value)) {
    return { message: placeholder.invalid + placeholder.mixture };
  }

  return null;
};

export const getPassPlaceholderValue = (value: PlaceTypes) => {
  return isEnglish() ? PasswordPlaceholders[value] : PasswordPlaceholdersRU[value];
};
export const getEmailPlaceholderValue = (value: PlaceTypes) => {
  return isEnglish() ? EmailPlaceholders[value] : EmailPlaceholdersRU[value];
};
export const getUserNamePlaceholderValue = (value: PlaceTypes) => {
  return isEnglish() ? UserNamePlaceholders[value] : UserNamePlaceholdersRU[value];
};
export const getRepeatPassPlaceholderValue = (value: PlaceTypes) => {
  return isEnglish() ? RepeatedPasswordPlaceholders[value] : RepeatedPasswordPlaceholdersRU[value];
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
