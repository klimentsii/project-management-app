import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
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
                ? [data.splice(rightColumn, leftColumn + 1), 'left']
                : [data.splice(leftColumn, rightColumn + 1), 'right'];

              columnsToChange.map((e, i) => {
                // dropSide === 'right'
                //   ? i === columnsToChange.length - 1
                //     ? this.apiService.updateColumn$(
                //         boardId,
                //         e.id,
                //         columnsToChange[0].title,
                //         e.order
                //       )
                //     : this.apiService.updateColumn$(
                //         boardId,
                //         e.id,
                //         columnsToChange[i + 1].title,
                //         e.order
                //       )
                //   : i === 0
                //     ? console.log(columnsToChange[columnsToChange.length - 1].title)
                //     : console.log(columnsToChange[i - 1].title);

                this.apiService.getColumnById$(boardId, e.id).subscribe(data => console.log(data));

                this.apiService.updateColumn$(
                  boardId,
                  e.id,
                  'ebeb',
                  e.order
                );

                this.apiService.getColumnById$(boardId, e.id).subscribe(data => console.log(data));

              });

              return ColumnsActions.ChangeColumnsOrderSuccess({ payload: data });
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
              return  ColumnsActions.DeleteColumnSuccess({ columnId })
            })
          );
        })
      );
    }
  );

};
