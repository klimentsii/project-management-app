import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardsActions from '../actions/boards.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../login/services/auth.service';
import { ApiService } from '../../services/api.service';
import { BoardModel } from '../../models/boards';
import { IsJsonString } from '../../../shared/helpers';

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
              ? boards.filter(board => {
                  return IsJsonString(board.title)
                    ? JSON.parse(board.title).users.includes(this.auth?.id)
                    : true;
                })
              : [];
            const finalBoards = filteredBoards.map(board => {
              const title = IsJsonString(board.title) ? JSON.parse(board.title).title : board.title;
              const users = IsJsonString(board.title)
                ? JSON.parse(board.title).users
                : this.auth
                ? [this.auth.id]
                : [];
              return {
                id: board.id,
                title,
                description: board.description,
                users,
              };
            });
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
      switchMap(({ title, description }) => {
        const users: UUIDType[] = [];
        if (this.auth) users.push(this.auth.id);
        const finalTitle = JSON.stringify({ title, users });
        return this.apiService.createBoard$(finalTitle, description).pipe(
          map((board: BoardModel) => {
            const payload = {
              id: board.id,
              title: JSON.parse(board.title).title,
              description: board.description,
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

  updateBoard = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.UpdateBoard),
      switchMap(({ id, title, description }) => {
        const newTitle = title;
        return this.apiService.getBoardById$(id).pipe(
          switchMap(({ title }) => {
            const titleParsed = IsJsonString(title) ? JSON.parse(title) : title;
            const users = IsJsonString(title) ? titleParsed.users : this.auth ? [this.auth.id] : [];
            const finalTitle = JSON.stringify({ title: newTitle, users });
            return this.apiService.updateBoard$(id, finalTitle, description).pipe(
              map((board: BoardModel) => {
                const payload = {
                  id: board.id,
                  title: JSON.parse(board.title).title,
                  description: board.description,
                  users,
                };
                return payload
                  ? BoardsActions.UpdateBoardSuccess({ payload })
                  : BoardsActions.UpdateBoardFailed();
              }),
              catchError(() => of(BoardsActions.UpdateBoardFailed())),
            );
          }),
        );
      }),
    );
  });

  deleteBoard = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.DeleteBoard),
      switchMap(({ boardId }) => {
        return this.apiService.deleteBoard$(boardId).pipe(
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
