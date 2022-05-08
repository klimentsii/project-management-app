import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../login/services/auth.service';
import { ApiService } from '../../services/api.service';
import { BoardModel } from '../../models/boards';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  auth = this.authService.getAuthInfo();

  fetchBoards = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.FetchBoards),
      switchMap(() =>
        this.apiService.getBoards$().pipe(
          map((boards: BoardModel[]) => {
            const filteredBoards = this.auth
              ? boards.filter(board => JSON.parse(board.title).users.includes(this.auth?.id))
              : [];
            const finalBoards = filteredBoards.map(board => ({
              id: board.id,
              title: JSON.parse(board.title).title,
              users: JSON.parse(board.title).users,
            }));
            return finalBoards
              ? BoardsActions.FetchBoardsSuccess({ boards: finalBoards })
              : BoardsActions.FetchBoardsFailed();
          }),
          catchError(() => of(BoardsActions.CreateBoardFailed())),
        ),
      ),
    );
  });

  createBoard = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.CreateBoard),
      switchMap(({ title }) => {
        const users: UUIDType[] = [];
        if (this.auth) users.push(this.auth.id);
        const finalTitle = JSON.stringify({ title, users });
        return this.apiService.createBoard$(finalTitle).pipe(
          map((board: BoardModel) => {
            const payload = {
              id: board.id,
              title: JSON.parse(board.title).title,
              users,
            };
            return payload
              ? BoardsActions.CreateBoardSuccess({ payload })
              : BoardsActions.CreateBoardFailed();
          }),
          catchError(() => of(BoardsActions.CreateBoardFailed())),
        );
      }),
    );
  });

  deleteBoard = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.DeleteBoard),
      switchMap(({ boardId }) => {
        return this.apiService.deleteBoard$(boardId).pipe(
          tap(res => console.log('res', res)),
          map(() => {
            return boardId
              ? BoardsActions.DeleteBoardSuccess({ boardId })
              : BoardsActions.DeleteBoardFailed();
          }),
          catchError(() => of(BoardsActions.DeleteBoardFailed())),
        );
      }),
    );
  });
}
