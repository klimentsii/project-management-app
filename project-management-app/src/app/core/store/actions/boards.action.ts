import {createAction, props} from '@ngrx/store';
import {BoardUsersModel} from "../../models/boards";
const actionSource = '[Boards]';


export const FetchBoards = createAction(
  `${actionSource} Fetch Boards`
)

export const FetchBoardsSuccess = createAction(
  `${actionSource} Fetch Boards Success`,
  props<{ boards: BoardUsersModel[] }>()
)

export const FetchBoardsFailed = createAction(
  `${actionSource} Fetch Boards Failed`
)

export const CreateBoard = createAction(
  `${actionSource} Create Board`,
  props<{ title: string }>()
)

export const CreateBoardSuccess = createAction(
  `${actionSource} Create Board Success`,
  props<{ payload: BoardUsersModel }>()
)

export const CreateBoardFailed = createAction(
  `${actionSource} Create Board Failed`
)

export const DeleteBoard = createAction(
  `${actionSource} Delete Board`,
  props<{ boardId: UUIDType }>()
)

export const DeleteBoardSuccess = createAction(
  `${actionSource} Delete Board Success`,
  props<{ boardId: UUIDType }>()
)

export const DeleteBoardFailed = createAction(
  `${actionSource} Delete Board Failed`
)
