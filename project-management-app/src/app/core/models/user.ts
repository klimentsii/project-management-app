export interface LoginModel {
  login: string;
  password: string;
}
export interface UserModel {
  name: string;
  login: string;
  password: string;
}

export interface UserNoIdModel {
  id: UUIDType;
  name: string;
  login: string;
}

export interface Token {
  token: string;
}
