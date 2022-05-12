import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ColumnModel } from "../../models/columns";

import * as ColumnsActions from '../actions/columns.action';

export const initialState: ColumnModel[] = [];

export const reducer = createReducer(
  initialState,
  on(ColumnsActions.FetchColumnsSuccess, (state: ColumnModel[], {payload}) => ([
    ...payload
  ])),
  on(ColumnsActions.FetchColumnsFailed, (state) => ({
    ...state,
  })),
  on(ColumnsActions.CreateColumnSuccess, (state: ColumnModel[], {payload}) => ([
    ...state, payload
  ])),
  on(ColumnsActions.DeleteColumnSuccess, (state: ColumnModel[], {columnId}) => ([
    ...state.filter(e => e.id !== columnId)
  ])),
  on(ColumnsActions.ChangeColumnsOrderSuccess, (state: ColumnModel[], {data}) => ([
    ...data
  ]))
);

export const getColumnsState = createFeatureSelector<ColumnModel[]>('columns');

export const getColumns = createSelector(
  getColumnsState,
  (state: ColumnModel[]) => state,
);
