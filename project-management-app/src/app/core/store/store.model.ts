import {AuthModel} from "../../login/models/auth.model";
import {BoardUsersModel} from "../models/boards";

export interface AppState {
  auth: UserState;
  boards: BoardState;
}

export interface UserState {
  user: AuthModel | null;
}

export interface BoardState {
  boards: BoardUsersModel[];
}
