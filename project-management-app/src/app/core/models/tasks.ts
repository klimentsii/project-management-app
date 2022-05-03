import { FileModel } from './files';

export interface TaskModel {
  id: UUIDType;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string | null;
  files: FileModel[];
}

export interface TaskModelPlus {
  id: UUIDType;
  title: string;
  order: number;
  description: string;
  userId: UUIDType;
  boardId: UUIDType;
  columnId: UUIDType;
}

export interface TaskModelExtra {
  id: UUIDType;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  board: string;
  boardId: string | null;
  columnId: string | null;
}
