import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import * as UserActions from '../../../core/store/actions/user.action';
import { Store } from '@ngrx/store';
import { AuthModel } from '../../../login/models/auth.model';
import * as fromUser from '../../../core/store/reducers/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  user$: Observable<AuthModel | null> = this.store.select(fromUser.selectCurrentUser);

  editMode$: Observable<boolean> = this.store.select(fromUser.selectCurrentUserEditMode);

  auth: AuthModel | null = null;

  userName: FormControl = new FormControl('');

  login: FormControl = new FormControl('');

  enterEditModeName(): void {
    this.userName = new FormControl(this.auth?.name);
    this.store.dispatch(UserActions.UpdateUserEditMode({ editMode: true }));
  }

  enterEditModeLogin(): void {
    this.login = new FormControl(this.auth?.login);
  }

  updateName(): void {
    if (this.auth) {
      this.store.dispatch(
        UserActions.UpdateUser({ login: this.auth.login, name: this.userName.value }),
      );
    }
  }

  ngOnInit(): void {
    this.userName.valueChanges.pipe(
      tap(() => {
        console.log(this.userName);
      }),
    );

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
