import { createAction, props } from '@ngrx/store';
import { AuthModel } from '../../../login/models/auth.model';
import { UserInfo, UserModel, UserNoIdModel } from '../../models/user';
import {TaskModelPlusFiles} from "../../models/tasks";

const actionSource = '[User]';

export const FetchUser = createAction(`${actionSource} Fetch User`);

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: AuthModel | null }>(),
);

export const FetchUserFailed = createAction(`${actionSource} Fetch User Failed`);

export const LogoutUser = createAction(`${actionSource} Logout User`);

export const LogoutUserSuccess = createAction(`${actionSource} Logout User Success`);

export const UpdateUserName = createAction(
  `${actionSource} Update User Name`,
  props<{ name: string }>(),
);

export const UpdateLogin = createAction(
  `${actionSource} Update Login`,
  props<{ login: string }>(),
);

export const UpdatePassword = createAction(
  `${actionSource} Update Password`,
  props<{ password: string }>(),
);

export const UpdateUserNameEditMode = createAction(
  `${actionSource} Update User Name Edit Mode`,
  props<{ editNameMode: boolean }>(),
);

export const UpdateLoginEditMode = createAction(
  `${actionSource} Update Login Edit Mode`,
  props<{ editLoginMode: boolean }>(),
);

export const UpdatePasswordEditMode = createAction(
  `${actionSource} Update Password Edit Mode`,
  props<{ editPasswordMode: boolean }>(),
);

export const UpdateUserSuccess = createAction(
  `${actionSource} Update User Success`,
  props<{ user: AuthModel | null }>(),
);

export const UpdateUserNameSuccess = createAction(
  `${actionSource} Update User Name Success`,
  props<{ user: AuthModel | null }>(),
);

export const UpdateLoginSuccess = createAction(
  `${actionSource} Update User Name Success`,
  props<{ user: AuthModel | null }>(),
);

export const UpdatePasswordSuccess = createAction(
  `${actionSource} Update Password Success`,
  props<{ user: AuthModel | null }>(),
);

export const UpdateUserFailed = createAction(`${actionSource} Update User Failed`);

export const DeleteUser = createAction(
  `${actionSource} Delete User`,
  props<{ id: UUIDType }>(),
);

export const DeleteUserTasks = createAction(
  `${actionSource} Delete User Tasks`,
  props<{ tasks: TaskModelPlusFiles[] }>()
);
export const DeleteUserTasksSuccess = createAction(`${actionSource} Delete User Tasks Success`);
export const DeleteUserTasksFailed = createAction(`${actionSource} Delete User Tasks Failed`);


export const DeleteUserColumns = createAction(
  `${actionSource} Delete User Columns`,
  props<{ columns: {columnId: UUIDType, boardId: UUIDType}[] }>()
);
export const DeleteUserColumnsSuccess = createAction(`${actionSource} Delete User Columns Success`);
export const DeleteUserColumnsFailed = createAction(`${actionSource} Delete User Columns Failed`);


export const DeleteUserBoards = createAction(
  `${actionSource} Delete User Boards`,
  props<{ boardsIds: UUIDType[] }>()
);
export const DeleteUserBoardsSuccess = createAction(`${actionSource} Delete User Boards Success`);
export const DeleteUserBoardsFailed = createAction(`${actionSource} Delete User Boards Failed`);




export const DeleteUserSuccess = createAction(
  `${actionSource} Delete User Success`,
  props<{ id: UUIDType }>()
);

export const DeleteUserSuccessRedux = createAction(
  `${actionSource} Delete User Success Redux`,
  props<{ id: UUIDType }>()
);

export const DeleteUserFailed = createAction(`${actionSource} Delete User Failed`);
