import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from '../actions/user.action';
import {catchError, map, of, switchMap, switchMapTo, tap} from "rxjs";
import {AuthService} from "../../../login/services/auth.service";
import {LogoutUser} from "../actions/user.action";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService) {
  }

  fetchUser = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.FetchUser),
      switchMapTo(
        of(this.authService.getAuthInfo()).pipe(
          tap((res) => console.log(res)),
          map(user => {
            console.log('USER AFTER SIGN IN', user);
            return user
              ? UserActions.FetchUserSuccess({user})
              : UserActions.FetchUserFailed()
          }),
          catchError(() => of(UserActions.FetchUserFailed()))
        )
      )
    )
  )

  logoutUser = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.LogoutUser),
      tap(() => console.log('Local storage is cleaned')),
      map(() => {
        this.authService.clearStorage();
        return UserActions.LogoutUserSuccess()
      })
    )
  )
}
