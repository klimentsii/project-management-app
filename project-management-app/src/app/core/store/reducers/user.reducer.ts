import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { UserState } from '../store.model';

export const initialState: UserState = {
  user: null,
  editNameMode: false,
  editLoginMode: false,
  editPasswordMode: false,
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
  on(UserActions.UpdateUserNameEditMode, (state, {editNameMode}): UserState => {
    return {
      ...state,
      editNameMode
    };
  }),
  on(UserActions.UpdateLoginEditMode, (state, {editLoginMode}): UserState => {
    return {
      ...state,
      editLoginMode
    };
  }),
  on(UserActions.UpdatePasswordEditMode, (state, {editPasswordMode}): UserState => {
    return {
      ...state,
      editPasswordMode
    };
  }),
);

export const selectUserStore = createFeatureSelector<UserState>('auth');

export const selectCurrentUser = createSelector(selectUserStore, (state: UserState) => {
  return state.user;
});

export const selectUserNameEditMode = createSelector(selectUserStore, (state: UserState) => {
  return state.editNameMode;
});

export const selectLoginEditMode = createSelector(selectUserStore, (state: UserState) => {
  return state.editLoginMode;
});

export const selectPasswordEditMode = createSelector(selectUserStore, (state: UserState) => {
  return state.editPasswordMode;
});
