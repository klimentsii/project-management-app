import {createAction, props} from '@ngrx/store';
import {AuthInfoModel} from "../../../login/models/auth.model";

const actionSource = '[Boards]';

export const createBoard = createAction(
  `${actionSource} Create Board`
)

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: AuthInfoModel }>()
)

export const FetchUserFailed = createAction(
  `${actionSource} Fetch User Failed`
)

export const LogoutUser = createAction(
  `${actionSource} Logout User`
)

export const LogoutUserSuccess = createAction(
  `${actionSource} Logout User Success`
)
