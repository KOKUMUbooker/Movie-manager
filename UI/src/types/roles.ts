export enum RoleEnum {
  Admin = 1,
  User = 2,
}

export type Role = RoleEnum.Admin | RoleEnum.User

export interface User {
  id: number;
  name: string;
  email: string;
  role: RoleEnum;
  joinDate: string;
  movies: number;
}