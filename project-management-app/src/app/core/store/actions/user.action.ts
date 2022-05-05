import {createAction, props} from '@ngrx/store';
import {AuthInfoModel} from "../../../login/models/auth.model";

const actionSource = '[User]';

export const fetchUser = createAction(
  `${actionSource} Fetch User`
)

export const fetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: AuthInfoModel }>()
)

export const fetchUserFailed = createAction(
  `${actionSource} Fetch User Failed`
)
