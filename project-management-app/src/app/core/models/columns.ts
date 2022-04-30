import {TaskModel} from "./tasks";

export interface ColumnModel {
  id: UUIDType;
  title: string;
  order: number;
}

export interface ColumnModelExtended extends ColumnModel {
  tasks: TaskModel[]
}
