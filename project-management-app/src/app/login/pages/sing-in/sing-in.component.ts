import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { isEnglish, myValidatorForPassword, PlaceTypes } from 'src/app/shared/helpers';
import { EmailPlaceholdersRU, PasswordPlaceholdersRU } from 'src/app/shared/placeholder.enum.ru';
import { AuthService } from '../../services/auth.service';
import { EmailPlaceholders, PasswordPlaceholders } from 'src/app/shared/placeholder.enum';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingInComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loginData: FormGroup;

  emailPlaceholder = {
    en: EmailPlaceholders.default,
    ru: EmailPlaceholdersRU.default,
  };

  passwordPlaceholder = this.getPassPlaceholderValue('default');

  login: string = '';

  password: string = '';

  constructor(private AuthServices: AuthService, private navigator: NavigatorService) {
    this.loginData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, myValidatorForPassword]),
    });
  }

  ngOnInit(): void {
    this.loginData.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.showPlaceholders();
      this.login = this.loginData.controls['email'].value;
      this.password = this.loginData.controls['password'].value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  showPlaceholderEmail() {
    this.emailPlaceholder.en =
      this.loginData.controls['email'].status === 'VALID'
        ? EmailPlaceholders.valid
        : EmailPlaceholders.invalid;

    this.emailPlaceholder.ru =
      this.loginData.controls['email'].status === 'VALID'
        ? EmailPlaceholdersRU.valid
        : EmailPlaceholdersRU.invalid;
  }

  showPlaceholders() {
    if (!this.loginData.controls['email'].pristine) {
      this.showPlaceholderEmail();
    }

    this.passwordPlaceholder = this.loginData.controls['password'].pristine
      ? this.getPassPlaceholderValue('default')
      : this.loginData.controls['password'].getError('message') ||
        this.getPassPlaceholderValue('valid');
  }

  onSubmit() {
    this.AuthServices.signIn$(this.login, this.password)
      .pipe(tap(() => this.navigator.goToTheBoards()))
      .subscribe();
  }

  isEnglish(): boolean {
    return isEnglish();
  }

  getPassPlaceholderValue(value: PlaceTypes) {
    return this.isEnglish() ? PasswordPlaceholders[value] : PasswordPlaceholdersRU[value];
  }
}
