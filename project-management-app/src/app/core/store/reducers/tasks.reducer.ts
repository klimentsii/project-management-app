import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { TaskModel, TaskModelPlus, TaskModelPlusFiles } from "../../models/tasks";

import * as TasksActions from '../actions/tasks.action';

export const initialState: TaskModelPlus[] = [];

export const reducer = createReducer(
  initialState,
  on(TasksActions.FetchTasksSuccess, (state: TaskModelPlus[], {tasks}) => ([
    ...tasks,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(TasksActions.CreateTaskSuccess, (state: TaskModelPlus[], {task}) => ([
    ...state, task,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(TasksActions.DeleteTaskSuccess, (state: TaskModelPlus[], {TaskId}) => ([
    ...state.filter(e => e.id !== TaskId),
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(TasksActions.EditTaskSuccess, (state: TaskModelPlus[], {taskId, title, description, order, done}) => {
    state.map(e => {
      if (e.id === taskId) {
        e.title = title;
        e.description = description;
        e.order = order;
        e.done = done;
      }
    })
    return [...state].sort((a, b) => a.order > b.order ? 1 : -1);
  }),
  on(TasksActions.ChangeTasksInColumnSuccess, (state: TaskModelPlus[], {data}) => {
    // state.map(e => {
    //   data.map(r => {
    //     e.id === r.id
    //       ? e = {...r}
    //       : e;
    //   });
    // });
    return [...state.sort((a, b) => a.order > b.order ? 1 : -1)];
  }),
    // ...state.map(e => {data.map(r => e.id === r.id ? e = {...r} : e)})
  // .sort((a, b) => a.order > b.order ? 1 : -1)),
  on(TasksActions.ChangeTasksInColumnFailed, (state: TaskModelPlus[]) => [
    ...state,
  ].sort((a, b) => a.order > b.order ? 1 : -1))
);

export const getTasksState = createFeatureSelector<TaskModelPlus[]>('tasks');

export const getTasks = createSelector(
  getTasksState,
  (state: TaskModelPlus[]) => state,
);
