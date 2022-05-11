import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import {
  getEmailPlaceholderValue,
  getPassPlaceholderValue,
  getRepeatPassPlaceholderValue,
  getUserNamePlaceholderValue,
  myValidatorForPassword,
} from 'src/app/shared/helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpComponent implements OnInit, OnDestroy {
  signUpData: FormGroup;

  emailPlaceholder = getEmailPlaceholderValue('default');

  userNamePlaceholder = getUserNamePlaceholderValue('default');

  passwordPlaceholder = getPassPlaceholderValue('default');

  repeatedPasswordPlaceholder = getRepeatPassPlaceholderValue('default');

  private destroy$ = new Subject<void>();

  login: string = '';

  name: string = '';

  password: string = '';

  constructor(private AuthServices: AuthService, private navigator: NavigatorService) {
    this.signUpData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required, Validators.min(3)]),
      password: new FormControl('', [Validators.required, myValidatorForPassword]),
      repeatedPassword: new FormControl('', [Validators.required, myValidatorForPassword]),
    });
  }

  ngOnInit() {
    this.signUpData.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.showPlaceholders();
          this.login = this.signUpData.controls['email'].value;
          this.name = this.signUpData.controls['userName'].value;
          this.password = this.signUpData.controls['password'].value;
        }),
      )
      .subscribe();

    this.signUpData.controls['password'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.validateRepeatedPassword()),
      )
      .subscribe();

    this.signUpData.controls['repeatedPassword'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.validateRepeatedPassword()),
      )
      .subscribe();
  }

  showPlaceholders() {
    if (!this.signUpData.controls['email'].pristine) {
      this.emailPlaceholder =
        this.signUpData.controls['email'].status === 'VALID'
          ? getEmailPlaceholderValue('valid')
          : getEmailPlaceholderValue('invalid');
    }

    if (!this.signUpData.controls['userName'].pristine) {
      this.userNamePlaceholder =
        this.signUpData.controls['userName'].status === 'VALID'
          ? getUserNamePlaceholderValue('valid')
          : getUserNamePlaceholderValue('invalid');
    }

    this.passwordPlaceholder = this.signUpData.controls['password'].pristine
      ? getPassPlaceholderValue('default')
      : this.signUpData.controls['password'].getError('message') ||
        getPassPlaceholderValue('valid');

    if (!this.signUpData.controls['repeatedPassword'].pristine) {
      this.repeatedPasswordPlaceholder =
        this.signUpData.controls['repeatedPassword'].status === 'VALID'
          ? getRepeatPassPlaceholderValue('valid')
          : getRepeatPassPlaceholderValue('invalid');
    }
  }

  validateRepeatedPassword() {
    if (
      this.signUpData.controls['repeatedPassword'].value &&
      this.signUpData.controls['password'].value !==
        this.signUpData.controls['repeatedPassword'].value
    ) {
      this.signUpData.controls['repeatedPassword'].setErrors({
        message: 'Wrong repeated password',
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  onSubmit() {
    this.AuthServices.signUp$(this.name, this.login, this.password)
      .pipe(tap(() => this.navigator.goToTheBoards()))
      .subscribe();
  }
}
