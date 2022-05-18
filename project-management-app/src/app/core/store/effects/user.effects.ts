import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { catchError, concatMap, exhaustMap, map, of, switchMap, switchMapTo } from 'rxjs';
import { AuthService } from '../../../login/services/auth.service';
import * as BoardsAction from '../actions/boards.action';
import { ApiService } from '../../services/api.service';
import { UserInfo } from '../../models/user';
import {UpdateUserEditMode} from "../actions/user.action";
import {delay} from "rxjs/operators";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

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
      exhaustMap(() => {
        this.authService.clearStorage();
        return [UserActions.LogoutUserSuccess(), BoardsAction.ClearBoards()];
      }),
    );
  });

  updateUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      switchMap(({ name, login }) => {
        const user = this.authService.getAuthInfo();
        const id = user?.id || '';
        const password = user?.password || '';
        const token = user?.token || '';
        return this.apiService.updateUser$(id, name, login, password).pipe(
          map(authInfo => {
            const newUser = { ...authInfo, token, password };
            const newUserRedux = { ...authInfo, token };
            if (newUser) this.authService.setAuthInfo(newUser);
            return newUserRedux
              ? UserActions.UpdateUserSuccess({ user: newUserRedux })
              : UserActions.UpdateUserFailed();
          }),
          catchError(() => of(UserActions.UpdateUserFailed())),
        );
      }),
    );
  });

  updateUserSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserSuccess),
      map(() => UserActions.UpdateUserEditMode({editMode: false})),
    );
  });

  // updateUserSuccess = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.UpdateUserSuccess),
  //     exhaustMap(() =>
  //       of(null).pipe(
  //         map(() => UserActions.UpdateUserEditMode({editMode: false})),
  //       ),
  //     )
  //   );
  // });




}
