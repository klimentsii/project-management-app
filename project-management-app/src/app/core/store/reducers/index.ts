import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromUser from './user.reducer'
import * as fromBoards from './boards.reducer'
import * as fromColumns from './columns.reductor'
import * as fromCore from './core.reducer'

export interface State {}

export const reducers: ActionReducerMap<State> = {
  auth: fromUser.reducer,
  boards: fromBoards.reducer,
  columns: fromColumns.reducer,
  core: fromCore.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
