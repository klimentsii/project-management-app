import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as BoardsActions from '../actions/boards.action'
import {BoardState} from "../store.model";

export const initialState: BoardState = {
  boards: [],
};

export const reducer = createReducer(
  initialState,
  on(BoardsActions.FetchBoardsSuccess, (state, {boards}) => ({
    ...state,
    boards
  })),
  on(BoardsActions.FetchBoardsFailed, (state) => ({
    ...state
  })),
  on(BoardsActions.CreateBoardSuccess, (state: BoardState, {payload}) => {
    const newBoards = [...state.boards];
    newBoards.push(payload);
    return {
      boards: newBoards
    }
  }),
  on(BoardsActions.CreateBoardFailed, (state) => ({
    ...state
  })),
  on(BoardsActions.DeleteBoardSuccess, (state: BoardState, {boardId}) => ({
    boards: [...state.boards].filter(board => board.id !== boardId)
  }))
);

export const getBoardsStore = createFeatureSelector<BoardState>('boards');

export const getBoards = createSelector(
  getBoardsStore,
  (state: BoardState) => state.boards);
