import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ColumnModel } from "../../models/columns";

import * as ColumnsActions from '../actions/columns.action';

export const initialState: ColumnModel[] = [];

export const reducer = createReducer(
  initialState,
  on(ColumnsActions.FetchColumnsSuccess, (state: ColumnModel[], {payload}) => ([
    ...payload,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(ColumnsActions.FetchColumnsFailed, (state) => ({
    ...state,
  }.sort((a, b) => a.order > b.order ? 1 : -1))),
  on(ColumnsActions.CreateColumnSuccess, (state: ColumnModel[], {payload}) => ([
    ...state, payload,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(ColumnsActions.DeleteColumnSuccess, (state: ColumnModel[], {columnId}) => ([
    ...state.filter(e => e.id !== columnId),
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(ColumnsActions.ChangeColumnsOrderSuccess, (state: ColumnModel[], {data}) => ([
    ...data,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
  on(ColumnsActions.UpdateColumnTitleSuccess, (state: ColumnModel[]) => ([
    ...state,
  ].sort((a, b) => a.order > b.order ? 1 : -1))),
);

export const getColumnsState = createFeatureSelector<ColumnModel[]>('columns');

export const getColumns = createSelector(
  getColumnsState,
  (state: ColumnModel[]) => state,
);
