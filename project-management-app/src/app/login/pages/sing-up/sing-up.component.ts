import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NavigatorService } from 'src/app/core/services/navigator.service';
// import { myValidatorForPassword } from 'src/app/shared/helpers';
import {
  EmailPlaceholders,
  PasswordPlaceholders,
  RepeatedPasswordPlaceholders,
  UserNamePlaceholders,
} from 'src/app/shared/placeholder.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpComponent implements OnInit, OnDestroy {
  signUpData: FormGroup;

  emailPlaceholder = EmailPlaceholders.default;

  userNamePlaceholder = UserNamePlaceholders.default;

  passwordPlaceholder = PasswordPlaceholders.default;

  repeatedPasswordPlaceholder = RepeatedPasswordPlaceholders.default;

  private destroy$ = new Subject<void>();

  login: string = '';

  name: string = '';

  password: string = '';

  constructor(private AuthServices: AuthService, private navigator: NavigatorService) {
    this.signUpData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required, Validators.min(3)]),
      password: new FormControl('', [Validators.required]),
      repeatedPassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.signUpData.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          // this.validateRepeatedPassword();
          this.showPlaceholders();
          this.login = this.signUpData.controls['email'].value;
          this.name = this.signUpData.controls['userName'].value;
          this.password = this.signUpData.controls['password'].value;
        }),
      )
      .subscribe();
  }

  showPlaceholders() {
    if (!this.signUpData.controls['email'].pristine) {
      this.emailPlaceholder =
        this.signUpData.controls['email'].status === 'VALID'
          ? EmailPlaceholders.valid
          : EmailPlaceholders.invalid;
    }

    if (!this.signUpData.controls['userName'].pristine) {
      this.userNamePlaceholder =
        this.signUpData.controls['userName'].status === 'VALID'
          ? UserNamePlaceholders.valid
          : UserNamePlaceholders.invalid;
    }

    this.passwordPlaceholder = this.signUpData.controls['password'].pristine
      ? PasswordPlaceholders.default
      : this.signUpData.controls['password'].getError('message') || PasswordPlaceholders.valid;

    if (!this.signUpData.controls['repeatedPassword'].pristine) {
      this.repeatedPasswordPlaceholder =
        this.signUpData.controls['repeatedPassword'].status === 'VALID'
          ? RepeatedPasswordPlaceholders.valid
          : RepeatedPasswordPlaceholders.invalid;
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
    this.AuthServices.signUp$(this.name, this.login, this.password).subscribe(() => {
      this.navigator.goHome();
    });
  }
}
