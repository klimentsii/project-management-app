import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { AuthService } from "src/app/login/services/auth.service";
import { ColumnModel } from "../../models/columns";
import { ApiService } from "../../services/api.service";

import * as ColumnsActions from '../actions/columns.action';


@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  auth = this.authService.getAuthInfo();

  fetchColumns = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnsActions.FetchColumns),
        switchMap(({payload}) => {
          return this.apiService.getColumns$(payload).pipe(
            map((columns: ColumnModel[]) => {
              return columns
                ? ColumnsActions.FetchColumnsSuccess({ payload: columns })
                : ColumnsActions.FetchColumnsFailed();
          }));
      }));
  });

  createColumn = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnsActions.CreateColumn),
        switchMap(({ boardId, title, columnsCount }) => {
          const currentColumnOrder = columnsCount;
          return this.apiService.createColumn(boardId, title, currentColumnOrder).pipe(
            map(() => {
              const newColumn: ColumnModel = {
                id: boardId,
                title: title,
                order: currentColumnOrder,
              }
              return ColumnsActions.CreateColumnSuccess({ payload: newColumn});
          }));
      }));
  });

  changeOrder = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnsActions.ChangeColumnsOrder),
        // this.apiService.getColumns$()
      )
    }
  )
}
