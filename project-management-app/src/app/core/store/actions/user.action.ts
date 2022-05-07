import {createAction, props} from '@ngrx/store';
import {AuthModel} from "../../../login/models/auth.model";

const actionSource = '[User]';

export const FetchUser = createAction(
  `${actionSource} Fetch User`
)

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: AuthModel | null }>()
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
