import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { UserState } from '../store.model';
import {UpdateUserSuccess} from "../actions/user.action";

export const initialState: UserState = {
  user: null,
  editMode: false
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
  on(UserActions.UpdateUserSuccess, (state, { user }): UserState => {
    return {
      ...state,
      user,
    };
  }),
  on(UserActions.UpdateUserFailed, (state): UserState => {
    return {
      ...state,
    };
  }),
  on(UserActions.UpdateUserEditMode, (state, {editMode}): UserState => {
    return {
      ...state,
      editMode
    };
  }),

);

export const selectUserStore = createFeatureSelector<UserState>('auth');

export const selectCurrentUser = createSelector(selectUserStore, (state: UserState) => {
  return state.user;
});

export const selectCurrentUserEditMode = createSelector(selectUserStore, (state: UserState) => {
  return state.editMode;
});
