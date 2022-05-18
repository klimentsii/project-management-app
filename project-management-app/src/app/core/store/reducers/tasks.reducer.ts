import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { TaskModel, TaskModelPlus } from "../../models/tasks";

import * as TasksActions from '../actions/tasks.action';

export const initialState: TaskModelPlus[] = [];

export const reducer = createReducer(
  initialState,
  on(TasksActions.FetchTasksSuccess, (state: TaskModelPlus[], {tasks}) => ([
    ...tasks,
  ])),//.sort((a, b) => a.order > b.order ? 1 : -1))),
  on(TasksActions.CreateTaskSuccess, (state: TaskModelPlus[], {task}) => ([
    ...state, task,
  ])),
  // on(TasksActions.DeleteTaskSuccess, (state: TaskModel[], {TaskId}) => ([
  //   ...state.filter(e => e.id !== TaskId),
  // ].sort((a, b) => a.order > b.order ? 1 : -1))),
  // on(TasksActions.ChangeTasksOrderSuccess, (state: TaskModel[], {data}) => ([
  //   ...data,
  // ].sort((a, b) => a.order > b.order ? 1 : -1))),
  // on(TasksActions.UpdateTaskTitleSuccess, (state: TaskModel[]) => ([
  //   ...state,
  // ].sort((a, b) => a.order > b.order ? 1 : -1))),
);

export const getTasksState = createFeatureSelector<TaskModelPlus[]>('tasks');

export const getTasks = createSelector(
  getTasksState,
  (state: TaskModelPlus[]) => state,
);
