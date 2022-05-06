import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as UserActions from '../actions/user.action'
import {UserState} from "../store.model";
import {LogoutUserSuccess} from "../actions/user.action";

export const initialState: UserState = {
  user: null,
  isFetched: false
}

export const reducer = createReducer(
  initialState,
  on(UserActions.FetchUserSuccess, (state, {user}) => {
    console.log('USER', user);
    return {
      ...state,
      user,
      isFetched: true,
    }
  }),
  on(UserActions.FetchUserFailed, (state) => ({
    ...state,
    isFetched: false,
  })),

  on(UserActions.LogoutUserSuccess, () => ({
      user: null,
      isFetched: false,
  })),
  on(UserActions.LogoutUser, () => ({
    user: null,
    isFetched: false,
  }))
)

export const getUserStore = createFeatureSelector<UserState>('auth');

export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => state.user
);

export const getIsFetched = createSelector(
  getUserStore,
  (state: UserState): boolean => {
    console.log('state.isFetched', state.isFetched);
    return state.isFetched
  }
);
