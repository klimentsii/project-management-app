import { AuthModel } from '../../login/models/auth.model';
import { BoardUsersModel } from '../models/boards';

export interface AppState {
  auth: UserState;
  boards: BoardState;
  core: CoreState;
}

export interface UserState {
  user: AuthModel | null;
}

export interface BoardState {
  boards: BoardUsersModel[] | [];
}

export type Languages = 'ru' | 'en';

export interface CoreState {
  lang: Languages;
}
