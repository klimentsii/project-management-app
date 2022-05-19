import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import * as UserActions from '../../../core/store/actions/user.action';
import { Store } from '@ngrx/store';
import { AuthModel } from '../../../login/models/auth.model';
import * as fromUser from '../../../core/store/reducers/user.reducer';
import { ConfirmationModalComponent } from '../../../core/components/confirmation-modal/confirmation-modal.component';

import { MatDialog } from '@angular/material/dialog';
import { getPassPlaceholderValue, myValidatorForPassword } from 'src/app/shared/helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private dialog: MatDialog) {}

  user$: Observable<AuthModel | null> = this.store.select(fromUser.selectCurrentUser);

  editNameMode$: Observable<boolean> = this.store.select(fromUser.selectUserNameEditMode);

  editLoginMode$: Observable<boolean> = this.store.select(fromUser.selectLoginEditMode);

  editPasswordMode$: Observable<boolean> = this.store.select(fromUser.selectPasswordEditMode);

  auth: AuthModel | null = null;

  userName: FormControl = new FormControl('');

  login: FormControl = new FormControl('');

  passForm: FormGroup = new FormGroup({
    password: new FormControl(''),
  });

  passwordPlaceholder = getPassPlaceholderValue('default');

  enterEditModeName(): void {
    this.userName = new FormControl(this.auth?.name);
    this.store.dispatch(UserActions.UpdateUserNameEditMode({ editNameMode: true }));
  }

  enterEditModeLogin(): void {
    this.login = new FormControl(this.auth?.login);
    this.store.dispatch(UserActions.UpdateLoginEditMode({ editLoginMode: true }));
  }

  enterEditModePassword(): void {
    this.passForm = new FormGroup({
      password: new FormControl('', [Validators.required, myValidatorForPassword]),
    });
    // this.password = new FormControl('', [Validators.required, myValidatorForPassword]);
    this.store.dispatch(UserActions.UpdatePasswordEditMode({ editPasswordMode: true }));
  }

  exitEditModeName(): void {
    this.store.dispatch(UserActions.UpdateUserNameEditMode({ editNameMode: false }));
  }

  exitEditModeLogin(): void {
    this.store.dispatch(UserActions.UpdateLoginEditMode({ editLoginMode: false }));
  }

  exitEditModePassword(): void {
    this.store.dispatch(UserActions.UpdatePasswordEditMode({ editPasswordMode: false }));
  }

  deleteUser(): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: this.auth?.id,
    });

    dialog
      .afterClosed()
      .pipe(
        tap(nextId => {
          if (nextId) this.store.dispatch(UserActions.DeleteUser({ id: nextId }));
        }),
      )
      .subscribe();
  }

  updateName(): void {
    if (this.auth) {
      this.store.dispatch(UserActions.UpdateUserName({ name: this.userName.value }));
    }
  }

  updateLogin(): void {
    if (this.auth) {
      this.store.dispatch(UserActions.UpdateLogin({ login: this.login.value }));
    }
  }

  updatePassword(): void {
    if (this.auth) {
      this.store.dispatch(UserActions.UpdatePassword(this.passForm.value));
    }
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        tap(user => {
          this.auth = user;
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
