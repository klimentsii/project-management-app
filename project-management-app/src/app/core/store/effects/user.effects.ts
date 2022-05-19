import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import {
  catchError,
  concatMap,
  exhaustMap,
  forkJoin,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs';
import { AuthService } from '../../../login/services/auth.service';
import * as BoardsAction from '../actions/boards.action';
import { ApiService } from '../../services/api.service';
import { AuthModel } from '../../../login/models/auth.model';
import { TaskModelPlus, TaskModelPlusFiles } from '../../models/tasks';

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
            const userCopy = { ...user };
            delete userCopy.password;
            const userWithOutPass = { ...userCopy } as AuthModel;
            return userWithOutPass
              ? UserActions.FetchUserSuccess({ user: userWithOutPass })
              : UserActions.FetchUserFailed();
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

  updateUserName = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserName),
      switchMap(({ name }) => {
        const user = this.authService.getAuthInfo();
        const id = user?.id || '';
        const login = user?.login || '';
        const password = user?.password || '';
        const token = user?.token || '';
        return this.apiService.updateUser$(id, name, login, password).pipe(
          map(authInfo => {
            const newUser = { ...authInfo, token, password };
            const newUserRedux = { ...authInfo, token };
            if (newUser) this.authService.setAuthInfo(newUser);
            return newUserRedux
              ? UserActions.UpdateUserNameSuccess({ user: newUserRedux })
              : UserActions.UpdateUserFailed();
          }),
          catchError(() => of(UserActions.UpdateUserFailed())),
        );
      }),
    );
  });

  UpdateUserNameSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserNameSuccess),
      concatMap(user => {
        return [
          UserActions.UpdateUserSuccess(user),
          UserActions.UpdateUserNameEditMode({ editNameMode: false }),
        ];
      }),
    );
  });

  updateLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateLogin),
      switchMap(({ login }) => {
        const user = this.authService.getAuthInfo();
        const id = user?.id || '';
        const name = user?.name || '';
        const password = user?.password || '';
        const token = user?.token || '';
        return this.apiService.updateUser$(id, name, login, password).pipe(
          map(authInfo => {
            const newUser = { ...authInfo, token, password };
            const newUserRedux = { ...authInfo, token };
            if (newUser) this.authService.setAuthInfo(newUser);
            return newUserRedux
              ? UserActions.UpdateLoginSuccess({ user: newUserRedux })
              : UserActions.UpdateUserFailed();
          }),
          catchError(() => of(UserActions.UpdateUserFailed())),
        );
      }),
    );
  });

  UpdateLoginSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateLoginSuccess),
      concatMap(user => {
        return [
          UserActions.UpdateUserSuccess(user),
          UserActions.UpdateLoginEditMode({ editLoginMode: false }),
        ];
      }),
    );
  });

  updatePassword = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdatePassword),
      switchMap(({ password }) => {
        const user = this.authService.getAuthInfo();
        const id = user?.id || '';
        const name = user?.name || '';
        const login = user?.login || '';
        const token = user?.token || '';

        return this.apiService.updateUser$(id, name, login, password).pipe(
          map(authInfo => {
            const newUser = { ...authInfo, token, password };
            const newUserRedux = { ...authInfo, token };
            if (newUser) this.authService.setAuthInfo(newUser);
            return newUserRedux
              ? UserActions.UpdatePasswordSuccess({ user: newUserRedux })
              : UserActions.UpdateUserFailed();
          }),
          catchError(() => of(UserActions.UpdateUserFailed())),
        );
      }),
    );
  });

  UpdatePasswordSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdatePasswordSuccess),
      concatMap(user => {
        return [
          UserActions.UpdateUserSuccess(user),
          UserActions.UpdatePasswordEditMode({ editPasswordMode: false }),
        ];
      }),
    );
  });

  DeleteUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUser),
      switchMap(({ id }) => {
        return this.apiService.search$().pipe(
          switchMap((tasks: TaskModelPlusFiles[]) => {
            const tasksToDelete = tasks.filter(task => task.userId === id);
            const streams = tasksToDelete.map((task: TaskModelPlusFiles) => {
              return this.apiService.deleteTask$(task.boardId, task.columnId, task.id);
            });
            const mergedStream = merge(streams);
            return mergedStream.pipe(
              map(() => {
                return UserActions.DeleteUserSuccess({ id });
              }),
              catchError(() => of(UserActions.DeleteUserFailed())),
            );
          }),
        );
      }),
    );
  });


  // DeleteUserSuccess = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.DeleteUserSuccess),
  //     concatMap(user => {
  //       return [
  //         UserActions.DeleteUserSuccess(user),
  //         UserActions.UpdatePasswordEditMode({ editPasswordMode: false }),
  //       ];
  //     }),


}
