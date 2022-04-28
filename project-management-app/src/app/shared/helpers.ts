import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordPlaceholders } from './placeholder.enum';

export const myValidatorForPassword = (control: AbstractControl): ValidationErrors | null => {
  const arrLetters = Array.from(control.value) as string[];

  if (control.value.length < 8) {
    return { message: PasswordPlaceholders.invalid + PasswordPlaceholders.short };
  }
  if (
    !arrLetters.some(letter => letter === letter.toLowerCase()) ||
    !arrLetters.some(letter => letter === letter.toUpperCase())
  ) {
    return { message: PasswordPlaceholders.invalid + PasswordPlaceholders.case };
  }
  if (!/[!@#\$%\^&\*\+]/.test(control.value)) {
    return { message: PasswordPlaceholders.invalid + PasswordPlaceholders.specialChar };
  }
  if (!/\d/.test(control.value)) {
    return { message: PasswordPlaceholders.invalid + PasswordPlaceholders.mixture };
  }

  return null;
};
