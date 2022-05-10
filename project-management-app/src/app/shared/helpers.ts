import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordPlaceholders } from './placeholder.enum';
import { PasswordPlaceholdersRU } from './placeholder.enum.ru';

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
