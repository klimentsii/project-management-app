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
import { DeleteUserTasks } from '../actions/user.action';
import {BoardModel} from "../../models/boards";

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
            const tasksOthers = tasks.filter(task => task.userId !== id);
            const tasksToDelete = tasks.filter(task => task.userId === id);
            const columnsIdsBoardsWithMyTasks = tasksToDelete.map(task => ({
              columnId: task.columnId,
              boardId: task.boardId,
            }));
            const columnsToDelete = columnsIdsBoardsWithMyTasks.filter(column => {
              for (let i = 0; i++; i < tasksOthers.length) {
                if (tasksOthers[i].columnId === column.columnId) return false;
              }
              return true;
            });
            const boardsIdsWithMyTasks = tasksToDelete.map(task => task.boardId);

            return [
              // UserActions.DeleteUserTasks({ tasks: tasksToDelete }),
              // UserActions.DeleteUserColumns({columns: columnsToDelete}),
              // UserActions.DeleteUserBoards({ boardsIds: boardsIdsWithMyTasks }),
              UserActions.DeleteUserSuccess({ id }),
            ];
          }),

          catchError(() => of(UserActions.DeleteUserFailed())),
        );
      }),
    );
  });

  DeleteUserTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUserTasks),
      switchMap(({ tasks }) => {
        const streamsTasks = tasks.map((task: TaskModelPlusFiles) => {
          return this.apiService
            .deleteTask$(task.boardId, task.columnId, task.id)
            .pipe(
              map(() => of(UserActions.DeleteUserTasksSuccess())),
              catchError(() => of(UserActions.DeleteUserTasksFailed())));
        });
        console.log('streams', streamsTasks);
        return forkJoin(streamsTasks).pipe(
          map(() => {
            return UserActions.DeleteUserTasksSuccess();
          }),
          catchError(() => of(UserActions.DeleteUserTasksFailed())),
        );
      }),
    );
  });

  DeleteUserColumns = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUserColumns),
      switchMap(({ columns }) => {
        const streamsColumns = columns.map((column) => {
          return this.apiService.deleteColumn$(column.boardId, column.columnId)
            .pipe(
              map(() => of(UserActions.DeleteUserColumnsSuccess())),
              catchError(() => of(UserActions.DeleteUserColumnsFailed()))
              )
        });
        console.log('streamsColumns', streamsColumns);
        return forkJoin(streamsColumns).pipe(
          map(() => {
            return UserActions.DeleteUserColumnsSuccess();
          }),
          catchError(() => of(UserActions.DeleteUserColumnsFailed())),
        );
      }),
    );
  });


  DeleteUserBoards = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUserBoards),
      switchMap(({boardsIds}) => {
        return this.apiService.getBoards$()
          .pipe(
            switchMap((boardsAll: BoardModel[]) => {
              const userId = this.authService.getAuthInfo()?.id;
              const boardsMy = userId
                ? boardsAll.filter((board) => JSON.parse(board.title).users[0] === userId)
                : [];
              const streamsBoards = boardsMy.map((board: BoardModel) => {
                return this.apiService.deleteBoard$(board.id)
                  .pipe(
                    map(() => of(UserActions.DeleteUserBoardsSuccess())),
                    catchError(() => of(UserActions.DeleteUserBoardsFailed()))
                  )
              });
              return forkJoin(streamsBoards).pipe(
                map(() => {
                  return UserActions.DeleteUserBoardsSuccess();
                }),
                catchError(() => of(UserActions.DeleteUserBoardsFailed())),
              );
            }),
          );
      }))
  });


  DeleteUserSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUserSuccess),
      switchMap(({ id }) => {
        console.log('userId', id);
        this.authService.clearStorage();
        return this.apiService.deleteUser$(id).pipe(
          map(() => {
            return UserActions.DeleteUserSuccessRedux({ id });
          }),
          catchError(() => of(UserActions.DeleteUserFailed())),
        );
      }),
    );
  });



  // DeleteUserSuccess = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.DeleteUserSuccess),
  //     concatMap(user => {
  //       return this.apiService.search$().pipe(
  //         switchMap((tasks: TaskModelPlusFiles[]) => {
  //           console.log('tasks', tasks);
  //           console.log('user', user)
  //           return [
  //             UserActions.DeleteUserSuccess(user),
  //             UserActions.DeleteUserSuccess(user),
  //           ];
  //         })
  //       )
  //     })
  //   )
  // });
}
