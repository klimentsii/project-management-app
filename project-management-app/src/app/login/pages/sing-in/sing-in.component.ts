import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import {
  getPassPlaceholderValue,
  myValidatorForPassword,
  getEmailPlaceholderValue,
} from 'src/app/shared/helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingInComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loginData: FormGroup;

  emailPlaceholder = getEmailPlaceholderValue('default');

  passwordPlaceholder = getPassPlaceholderValue('default');

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
    this.emailPlaceholder =
      this.loginData.controls['email'].status === 'VALID'
        ? getEmailPlaceholderValue('valid')
        : getEmailPlaceholderValue('invalid');
  }

  showPlaceholders() {
    if (!this.loginData.controls['email'].pristine) {
      this.showPlaceholderEmail();
    }

    this.passwordPlaceholder = this.loginData.controls['password'].pristine
      ? getPassPlaceholderValue('default')
      : this.loginData.controls['password'].getError('message') || getPassPlaceholderValue('valid');
  }

  onSubmit() {
    this.AuthServices.signIn$(this.login, this.password)
      .pipe(tap(() => this.navigator.goToTheBoards()))
      .subscribe();
  }
}
