import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, pipe, switchMap, tap } from "rxjs";
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
            })
          );
        })
      );
    }
  );

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
            })
          );
        })
      );
    }
  );

  changeOrder = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnsActions.ChangeColumnsOrder),
        switchMap(({ boardId, columns }) => {
          return this.apiService.getColumns$(boardId).pipe(
            map((data) => {

              const MAX_ORDER_IN_COLUMN = Math.max(...data.map(e => e.order));

              data.map(e => {
                columns.map((r, i) => {
                  if (e.id === r.id) {
                    e.order = MAX_ORDER_IN_COLUMN + 1 + i;
                    this.apiService.updateColumn$(
                      boardId,
                      e.id,
                      e.title,
                      MAX_ORDER_IN_COLUMN + 1 + i,
                    ).subscribe(data => data);
                  }
                })
              });

              return ColumnsActions.ChangeColumnsOrderSuccess({ data: data });
            })
          );
        })
      );
    }
  );

  deleteColumn = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ColumnsActions.DeleteColumn),
        switchMap(({ boardId, columnId }) => {
          return this.apiService.deleteColumn$(boardId, columnId).pipe(
            map(() => {
              return ColumnsActions.DeleteColumnSuccess({ columnId })
            })
          );
        })
      );
    }
  );

  updateColumnTitle$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ColumnsActions.UpdateColumnTitle),
        switchMap(({ boardId, title, columnId, order }) => {
          return this.apiService.updateColumn$(boardId, columnId, title, order).pipe(
            map((data) => {
              return ColumnsActions.UpdateColumnTitleSuccess();
            })
          )
        }));
  });

};
