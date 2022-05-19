import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, pipe, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/login/services/auth.service";
import { ColumnModel } from "../../models/columns";
import { TaskModel, TaskModelPlus, TaskModelPlusFiles } from "../../models/tasks";
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
        switchMap(({ boardId }) => {
          return this.apiService.search$().pipe(
            map((tasks: TaskModelPlusFiles[]) => {
              return TasksActions.FetchTasksSuccess({ tasks: tasks });
            })
          );
        }
      ));
    }
  );

  createTask = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.CreateTask),
        switchMap(({ task }) => {
          return this.apiService.createTask(task).pipe(
            map((newTask) => {
              return TasksActions.CreateTaskSuccess({ task: newTask, });
            })
          );
        })
      );
    }
  );

  deleteTask = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.DeleteTask),
        switchMap(({ boardId, columnId, TaskId }) => {
          return this.apiService.deleteTask$(boardId, columnId, TaskId).pipe(
            map(() => {
              return TasksActions.DeleteTaskSuccess({ TaskId })
            })
          );
        })
      );
    }
  );

  editTask = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.EditTask),
        switchMap(({ boardId, columnId, taskId, title, description, done, order, userId }) => {
          return this.apiService.updateTask$(
            boardId,
            columnId,
            taskId,
            title,
            order,
            done,
            description,
            userId,
            boardId,
            columnId,
          ).pipe(
            map(() => {
              return TasksActions.EditTaskSuccess({ taskId, title, description, order, done })
            })
          );
        })
      );
    }
  );

  changeOrder = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TasksActions.ChangeTasksOrder),
        switchMap(({ boardId, tasks }) => {
          return this.apiService.search$().pipe(
            map((data) => {

              const MAX_ORDER_IN_TASK = Math.max(...data.map(e => e.order));

              console.log(tasks);
              console.log(data);


              // data.map(e => {
              //   tasks.map((r, i) => {
              //     if (e.id === r.id) {
              //       e.order = MAX_ORDER_IN_TASK + 1 + i;
              //       this.apiService.updateTask$(
              //         boardId,
              //         e.id,
              //         e.title,
              //         MAX_ORDER_IN_TASK + 1 + i,
              //       ).subscribe(data => data);
              //     }
              //   })
              // });

              return TasksActions.ChangeTasksOrderSuccess({ data: data });
            })
          );
        })
      );
    }
  );

};
