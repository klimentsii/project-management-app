import { createAction, props } from "@ngrx/store";
import { ColumnModel } from "../../models/columns";
const actionSource = '[Columns]';

export const FetchColumns = createAction(
  `${actionSource} Fetch Columns`,
  props<{ payload: UUIDType }>()
)

export const FetchColumnsSuccess = createAction(
  `${actionSource} Fetch Columns Success`,
  props<{ payload: ColumnModel[] }>()
)

export const FetchColumnsFailed = createAction(
  `${actionSource} Fetch Columns Failed`
)

export const CreateColumn = createAction(
  `${actionSource} Create Column`,
  props<{ boardId: UUIDType, title: string, columnsCount: number }>()
)

export const CreateColumnSuccess = createAction(
  `${actionSource} Create Column Success`,
  props<{ payload: ColumnModel}>()
)

export const CreateColumnFailed = createAction(
  `${actionSource} Create Column Failed`
)

export const ChangeColumnsOrder = createAction(
  `${actionSource} Change Columns Order`,
  props<{ boardId: UUIDType, columns: ColumnModel[] }>()
)

export const ChangeColumnsOrderSuccess = createAction(
  `${actionSource} Change Columns Order Success`,
  props<{ data: ColumnModel[] }>()
)

export const ChangeColumnsOrderFailed = createAction(
  `${actionSource} Change Columns Order Failed`
)

export const DeleteColumn = createAction(
  `${actionSource} Delete Column`,
  props<{ boardId: UUIDType, columnId: UUIDType }>(),
)

export const DeleteColumnSuccess = createAction(
  `${actionSource} Delete Column Success`,
  props<{ columnId: UUIDType }>(),
)

export const DeleteColumnFailed = createAction(
  `${actionSource} Delete Column Failed`,
)

export const UpdateColumnTitle = createAction(
  `${actionSource} Update Columnn Title`,
  props<{ boardId: UUIDType, columnId: UUIDType, title: string, order: number }>(),
)

export const UpdateColumnTitleSuccess = createAction(
  `${actionSource} Update Columnn Title Success`,
)

export const UpdateColumnTitleFailed = createAction(
  `${actionSource} Update Columnn Title Failed`,
)
