import {AuthInfoModel} from "../../login/models/auth.model";
import {BoardModel} from "../../board/models/board.model";

export interface AppState {
  user: UserState;
  boards: BoardsState;
}

export interface UserState {
  user: AuthInfoModel | null;
}

export interface BoardsState {
  boards: BoardModel[] | null;
}
