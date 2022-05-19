import { createAction, props } from '@ngrx/store';
import { TaskModel, TaskModelPlus } from '../../models/tasks';

const actionSource = '[Tasks]';

export const FetchTasks = createAction(
  `${actionSource} Fetch Tasks`,
  props<{ boardId: UUIDType }>(),
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

export const DeleteTask = createAction(
  `${actionSource} Delete Task`,
  props<{ boardId: UUIDType, columnId: UUIDType, TaskId: UUIDType }>(),
);

export const DeleteTaskSuccess = createAction(
  `${actionSource} Delete Task Success`,
  props<{ TaskId: UUIDType }>(),
);

export const DeleteTaskFailed = createAction(
  `${actionSource} Delete Task Failed`,
);

export const EditTask = createAction(
  `${actionSource} Edit Task`,
  props<{ boardId: UUIDType, columnId: UUIDType, taskId: UUIDType, title: string, description: string, done: boolean, order: number, userId: UUIDType }>(),
);

export const EditTaskSuccess = createAction(
  `${actionSource} Edit Task Success`,
  props<{ taskId: UUIDType, title: string, description: string, order: number, done: boolean }>(),
);

export const EditTaskFailed = createAction(
  `${actionSource} Edit Task Failed`,
);

export const ChangeTasksInColumn = createAction(
  `${actionSource} Change Tasks In Column`,
  props<{ boardId: UUIDType, columnId: string, tasks: TaskModelPlus[] }>()
)

export const ChangeTasksInColumnSuccess = createAction(
  `${actionSource} Change Tasks In Column Success`,
  props<{ data: TaskModelPlus[] }>()
)

export const ChangeTasksInColumnFailed = createAction(
  `${actionSource} Change Tasks In Column Failed`
)
