import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, pipe, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/login/services/auth.service";
import { TaskModel, TaskModelPlus } from "../../models/tasks";
import { ApiService } from "../../services/api.service";

import * as TasksActions from '../actions/tasks.action';


@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  auth = this.authService.getAuthInfo();

  fetchTasks = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.FetchTasks),
        switchMap(({ boardId, columnId }) => {
          return this.apiService.getTasks$(boardId, columnId).pipe(
            map((tasks: TaskModelPlus[]) => {
              return TasksActions.FetchTasksSuccess({ tasks: tasks });
            })
          );
        }
      ));
    }
  );

  // createTask = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TasksActions.CreateTask),
  //       switchMap(({ task }) => {
  //         const currentTaskOrder = TasksCount;
  //         return this.apiService.createTask(boardId, title, currentTaskOrder).pipe(
  //           map(() => {
  //             const newTask: TaskModel = {
  //               id: boardId,
  //               title: title,
  //               order: currentTaskOrder,
  //             }
  //             return TasksActions.CreateTaskSuccess({ payload: newTask});
  //           })
  //         );
  //       })
  //     );
  //   }
  // );

  // changeOrder = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TasksActions.ChangeTasksOrder),
  //       switchMap(({ boardId, Tasks }) => {
  //         return this.apiService.getTasks$(boardId).pipe(
  //           map((data) => {

  //             const MAX_ORDER_IN_Task = Math.max(...data.map(e => e.order));

  //             data.map(e => {
  //               Tasks.map((r, i) => {
  //                 if (e.id === r.id) {
  //                   e.order = MAX_ORDER_IN_Task + 1 + i;
  //                   this.apiService.updateTask$(
  //                     boardId,
  //                     e.id,
  //                     e.title,
  //                     MAX_ORDER_IN_Task + 1 + i,
  //                   ).subscribe(data => data);
  //                 }
  //               })
  //             });

  //             return TasksActions.ChangeTasksOrderSuccess({ data: data });
  //           })
  //         );
  //       })
  //     );
  //   }
  // );

  // deleteTask = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TasksActions.DeleteTask),
  //       switchMap(({ boardId, TaskId }) => {
  //         return this.apiService.deleteTask$(boardId, TaskId).pipe(
  //           map(() => {
  //             return TasksActions.DeleteTaskSuccess({ TaskId })
  //           })
  //         );
  //       })
  //     );
  //   }
  // );

  // updateTaskTitle$ = createEffect(() => {
  //   return this.actions$.pipe(
  //       ofType(TasksActions.UpdateTaskTitle),
  //       switchMap(({ boardId, title, TaskId, order }) => {
  //         return this.apiService.updateTask$(boardId, TaskId, title, order).pipe(
  //           map((data) => {
  //             return TasksActions.UpdateTaskTitleSuccess();
  //           })
  //         )
  //       }));
  // });

};
