export interface AuthModel {
  token: string;
  id: UUIDType;
  name: string;
  login: string;
}

export interface AuthModelExtended extends AuthModel {
  password: string;
}

