export enum RoleEnum {
  User=  'user' ,
  Admin=   'admin'
}

export type Role = RoleEnum.Admin | RoleEnum.User
