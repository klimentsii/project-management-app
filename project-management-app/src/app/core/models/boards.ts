import {TaskModel} from "./tasks";

export interface ColumnModel {
  id: UUIDType;
  title: string;
  order: number;
}

export interface ColumnModelExtended extends ColumnModel {
  tasks: TaskModel[]
}

export interface BoardModel {
  id: UUIDType;
  title: string;
}

export interface BoardModelExtended extends BoardModel {
  columns: ColumnModelExtended[]
}
