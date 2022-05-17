import { createAction, props } from '@ngrx/store';
import { TaskModel, TaskModelPlus } from '../../models/tasks';

const actionSource = '[Tasks]';

export const FetchTasks = createAction(
  `${actionSource} Fetch Tasks`,
  props<{ boardId: UUIDType, columnId: UUIDType }>(),
);

export const FetchTasksSuccess = createAction(
  `${actionSource} Fetch Tasks Success`,
  props<{ tasks: TaskModelPlus[] }>(),
);

export const FetchTasksFailed = createAction(
  `${actionSource} Fetch Tasks Failed`,
);

export const CreateTask = createAction(
  `${actionSource} Create Task`,
  props<{ task: TaskModelPlus }>(),
);

export const CreateTaskSuccess = createAction(
  `${actionSource} Create Task Success`,
  props<{ task: TaskModelPlus }>(),
);

export const CreateTaskFailed = createAction(
  `${actionSource} Create Task Failed`,
);

export const UpdateTask = createAction(
  `${actionSource} Update Task`,
  props<TaskModelPlus>(),
);

export const UpdateTaskSuccess = createAction(
  `${actionSource} Update Task Success`,
  props<{ tasks: TaskModelPlus[] }>(),
);

export const UpdateTaskFailed = createAction(
  `${actionSource} Update Task Failed`,
);

export const DeleteTask = createAction(
  `${actionSource} Delete Task`,
  props<{ boardId: UUIDType, columnId: UUIDType, TaskId: UUIDType }>(),
);

export const DeleteTaskSuccess = createAction(
  `${actionSource} Delete Task Success`,
  props<{ boardId: UUIDType, columnId: UUIDType, TaskId: UUIDType }>(),
);

export const DeleteTaskFailed = createAction(
  `${actionSource} Delete Task Failed`,
);
