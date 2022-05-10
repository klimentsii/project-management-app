import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { catchError, map, of, switchMapTo } from 'rxjs';
import { AuthService } from '../../../login/services/auth.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  fetchUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.FetchUser),
      switchMapTo(
        of(this.authService.getAuthInfo()).pipe(
          map(user => {
            return user ? UserActions.FetchUserSuccess({ user }) : UserActions.FetchUserFailed();
          }),
          catchError(() => of(UserActions.FetchUserFailed())),
        ),
      ),
    );
  });

  logoutUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.LogoutUser),
      map(() => {
        this.authService.clearStorage();
        return UserActions.LogoutUserSuccess();
      }),
    );
  });
}
