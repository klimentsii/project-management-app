export interface Iboards {
  id: UUIDType;
  title: string;
  description: string;
}

export interface Idb {
  title: string;
  users: Array<UUIDType>;
  id: UUIDType;
}
