import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { UserState } from '../store.model';

export const initialState: UserState = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.FetchUserSuccess, (state, { user }): UserState => {
    return {
      ...state,
      user,
    };
  }),
  on(UserActions.FetchUserFailed, (state): UserState => {
    return {
      ...state,
    };
  }),

  on(UserActions.LogoutUserSuccess, (state): UserState => {
    return {
      ...state,
      user: null,
    };
  }),
);

export const selectUserStore = createFeatureSelector<UserState>('auth');

export const selectCurrentUser = createSelector(selectUserStore, (state: UserState) => {
  return state.user;
});
