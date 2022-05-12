import { createAction, props } from "@ngrx/store";
import { ColumnModel } from "../../models/columns";
const actionSource = '[Columns]';

export const FetchColumns = createAction(
  `${actionSource} Fetch Columns`,
  props<{ payload: UUIDType }>()
)

export const FetchColumnsSuccess = createAction(
  `${actionSource} Fetch Columns success`,
  props<{ payload: ColumnModel[] }>()
)

export const FetchColumnsFailed = createAction(
  `${actionSource} Fetch Columns failed`
)

export const CreateColumn = createAction(
  `${actionSource} Create Column`,
  props<{ boardId: UUIDType, title: string, columnsCount: number }>()
)

export const CreateColumnSuccess = createAction(
  `${actionSource} Create Column success`,
  props<{ payload: ColumnModel}>()
)

export const CreateColumnFailed = createAction(
  `${actionSource} Create Column failed`
)

export const ChangeColumnsOrder = createAction(
  `${actionSource} Change Columns Order`,
  props<{ boardId: UUIDType, leftColumn: number, rightColumn: number }>()
)

export const ChangeColumnsOrderSuccess = createAction(
  `${actionSource} Change Columns Order Success`,
  props<{ data: ColumnModel[] }>()
)

export const DeleteColumn = createAction(
  `${actionSource} Delete Column`,
  props<{ boardId: UUIDType, columnId: UUIDType }>()
)

export const DeleteColumnSuccess = createAction(
  `${actionSource} Delete Column success`,
  props<{ columnId: UUIDType }>()
)

export const DeleteColumnFailed = createAction(
  `${actionSource} Delete Column failed`
)
