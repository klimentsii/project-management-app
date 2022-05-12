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
        switchMap(({ boardId, leftColumn, rightColumn }) => {
          return this.apiService.getColumns$(boardId).pipe(
            map((data) => {
              const [columnsToChange, dropSide] = leftColumn > rightColumn
                ? [data.slice(rightColumn, leftColumn + 1).reverse(), 'left', ]
                : [data.slice(leftColumn, rightColumn + 1), 'right', ];

              const firstTitle = columnsToChange[0].title;

              columnsToChange.forEach((e, i) => {
                e.title =
                  i !== columnsToChange.length - 1
                    ? columnsToChange[i + 1].title
                    : firstTitle;
              });

              if (dropSide === 'left')
                columnsToChange.reverse();

              columnsToChange.map(e => {
                this.apiService.updateColumn$(
                  boardId,
                  e.id,
                  e.title,
                  e.order,
                ).subscribe(data => data);
              });

              data.forEach((e, i) => {
                columnsToChange.map(el => {
                  if (e.id === el.id) {
                    e.title = el.title;
                  };
                });
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

};
