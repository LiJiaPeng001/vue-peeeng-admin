export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserInfo {
  token?: string;
  name: string;
}
