import { ColumnModelExtended } from './columns';

export interface BoardInputFields {
  title: string;
  description: string;
}

export interface BoardModel extends BoardInputFields {
  id: UUIDType;
}

export interface BoardUsersModel extends BoardModel {
  users: UUIDType[];
}

export interface BoardModelExtended extends BoardModel {
  columns: ColumnModelExtended[];
}
