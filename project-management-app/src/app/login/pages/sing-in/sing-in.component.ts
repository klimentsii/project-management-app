import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { myValidatorForPassword } from 'src/app/shared/helpers';
import { EmailPlaceholders, PasswordPlaceholders } from 'src/app/shared/placeholder.enum';
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

  emailPlaceholder = EmailPlaceholders.default;

  passwordPlaceholder = PasswordPlaceholders.default;

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

  showPlaceholders() {
    if (!this.loginData.controls['email'].pristine) {
      this.emailPlaceholder =
        this.loginData.controls['email'].status === 'VALID'
          ? EmailPlaceholders.valid
          : EmailPlaceholders.invalid;
    }

    this.passwordPlaceholder = this.loginData.controls['password'].pristine
      ? PasswordPlaceholders.default
      : this.loginData.controls['password'].getError('message') || PasswordPlaceholders.valid;
  }

  onSubmit() {
    this.AuthServices.signIn$(this.login, this.password).subscribe(() => {
      this.navigator.goHome();
    });
  }
}
