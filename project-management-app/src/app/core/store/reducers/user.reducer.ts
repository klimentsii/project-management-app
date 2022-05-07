import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as UserActions from '../actions/user.action'
import {UserState} from "../store.model";

export const initialState: UserState = {
  user: null
}

export const reducer = createReducer(
  initialState,
  on(UserActions.FetchUserSuccess, (state, {user}) => {
    return {
      ...state,
      user
    }
  }),
  on(UserActions.FetchUserFailed, (state) => ({
    ...state
  })),

  on(UserActions.LogoutUserSuccess, () => ({
      user: null
  }))
)

export const getUserStore = createFeatureSelector<UserState>('auth');

export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => {
    console.log(state)
    return state.user
  }
);
