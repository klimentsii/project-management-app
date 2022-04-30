import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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

  emailPlaceholder = EmailPlaceholders.default;

  signUpData = PasswordPlaceholders.default;

  constructor() {
    this.loginData = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.loginData.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.showPlaceholders();
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

    this.loginData = this.loginData.controls['password'].pristine
      ? PasswordPlaceholders.default
      : this.loginData.controls['password'].getError('message') || PasswordPlaceholders.valid;
  }

  onSubmit() {}
}
