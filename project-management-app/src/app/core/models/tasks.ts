export interface TaskModel {
  id: UUIDType;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  board: string;
  boardId: string | null;
  columnId: string | null;
}