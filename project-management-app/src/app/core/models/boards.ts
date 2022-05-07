import { ColumnModelExtended } from './columns';

export interface BoardModel {
  id: UUIDType;
  title: string;
}

export interface BoardUsersModel extends BoardModel {
  users: UUIDType[];
}



export interface BoardModelExtended extends BoardModel {
  columns: ColumnModelExtended[];
}
