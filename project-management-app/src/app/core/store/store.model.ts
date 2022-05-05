import {AuthInfoModel} from "../../login/models/auth.model";

export interface AppState {
  auth : UserState;
}

export interface UserState {
  user: AuthInfoModel | null;
  isFetched: boolean;
}
