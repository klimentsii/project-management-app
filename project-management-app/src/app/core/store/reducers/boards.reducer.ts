import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BoardsActions from '../actions/boards.action';
import { BoardState } from '../store.model';

export const initialState: BoardState = {
  boards: [],
};

export const reducer = createReducer(
  initialState,
  on(BoardsActions.FetchBoardsSuccess, (state, { boards }): BoardState => {
    return {
      ...state,
      boards,
    };
  }),
  on(BoardsActions.FetchBoardsFailed, (state): BoardState => {
    return {
      ...state,
    };
  }),
  on(BoardsActions.CreateBoardSuccess, (state: BoardState, { payload }): BoardState => {
    const newBoards = [...state.boards];
    newBoards.push(payload);
    return {
      boards: newBoards,
    };
  }),
  on(
    BoardsActions.CreateBoardFailed,
    (state): BoardState => ({
      ...state,
    }),
  ),
  on(BoardsActions.UpdateBoardSuccess, (state: BoardState, { payload }): BoardState => {
    const oldBoards = [...state.boards];
    const newBoards = oldBoards.map(board => {
      return board.id === payload.id ? payload : board;
    });
    return {
      boards: newBoards,
    };
  }),
  on(
    BoardsActions.UpdateBoardFailed,
    (state): BoardState => ({
      ...state,
    }),
  ),
  on(
    BoardsActions.DeleteBoardSuccess,
    (state: BoardState, { boardId }): BoardState => ({
      boards: [...state.boards].filter(board => board.id !== boardId),
    }),
  ),
  on(
    BoardsActions.ClearBoards,
    (): BoardState => ({
      boards: [],
    }),
  ),
);

export const selectBoardsStore = createFeatureSelector<BoardState>('boards');

export const selectBoards = createSelector(selectBoardsStore, (state: BoardState) => state.boards);
