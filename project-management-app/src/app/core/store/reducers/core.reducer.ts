import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { CoreState } from '../store.model';
import * as CoreActions from '../actions/core.action';

export const initialState: CoreState = {
  lang: 'ru',
};

export const reducer = createReducer(
  initialState,
  on(CoreActions.ChangeLanguage, (state, { lang }): CoreState => {
    return {
      ...state,
      lang,
    };
  }),
);

export const selectUserStore = createFeatureSelector<CoreState>('core');
