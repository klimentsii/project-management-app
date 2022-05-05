import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from '../actions/user.action';
import {catchError, map, of, switchMap, switchMapTo, tap} from "rxjs";
import {AuthService} from "../../../login/services/auth.service";

@Injectable()
export class UserEffects {
  constructor( private actions$: Actions, private authService: AuthService ) {}

  fetchUser = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMapTo(
        of(this.authService.getAuthInfo()).pipe(
          tap((res) => console.log(res)),
          map(user => {
            console.log('USER AFTER SIGN IN', user);

            return user
              ? UserActions.fetchUserSuccess({user})
              : UserActions.fetchUserFailed()
          }),
          catchError(() => of(UserActions.fetchUserFailed()))
        )
      )
    )
  )

}
