import { createAction, props } from '@ngrx/store';
import { AuthModel } from '../../../login/models/auth.model';
import {UserInfo, UserModel, UserNoIdModel} from '../../models/user';

const actionSource = '[User]';

export const FetchUser = createAction(`${actionSource} Fetch User`);

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: AuthModel | null }>(),
);

export const FetchUserFailed = createAction(`${actionSource} Fetch User Failed`);

export const LogoutUser = createAction(`${actionSource} Logout User`);

export const LogoutUserSuccess = createAction(`${actionSource} Logout User Success`);

export const UpdateUser = createAction(`${actionSource} Update User`, props<UserInfo>());

export const UpdateUserDB = createAction(`${actionSource} Update User DB`, props<UserInfo>());

export const UpdateUserEditMode = createAction(`${actionSource} Update User Edit Mode`, props<{editMode: boolean}>());

export const UpdateUserSuccess = createAction(
  `${actionSource} Update User Success`,
  props<{ user: AuthModel | null }>(),
);

export const UpdateUserFailed = createAction(`${actionSource} Update User Failed`);
