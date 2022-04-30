import {ColumnModelExtended} from "./columns";

export interface BoardModel {
  id: UUIDType;
  title: string;
}

export interface BoardModelExtended extends BoardModel {
  columns: ColumnModelExtended[]
}
