export interface Iboards {
  id: UUIDType;
  title: string;
}

export interface Idb {
  title: Array<string>;
  deleteButton: Array<boolean>;
  users: Array<Array<UUIDType>>;
  id: Array<UUIDType>;
}
