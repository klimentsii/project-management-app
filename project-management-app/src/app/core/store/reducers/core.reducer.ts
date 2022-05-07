import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import { CoreState } from "../store.model";
import * as CoreActions from '../actions/core.action'

export const initialState: CoreState = {
  lang: 'ru'
}

export const reducer = createReducer(
  initialState,
  on(CoreActions.ChangeLanguage, (state, {lang}) => {
    return {
      ...state,
      lang
    }
  }),
)

export const getUserStore = createFeatureSelector<CoreState>('core');
