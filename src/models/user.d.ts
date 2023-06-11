export type UserPermission = {
  app_id: string,
  level: number,
  parent_app_id?: string,
}
export type UserFactory = {
  factory_id: string,
}
export type User = {
  [key: string]: string | string[] | UserPermission[]
  id: string;
  email: string;
  hashemail?: string;
  password: string;
  name: string;
  lastname: string;
  userFactories: UserFactory[];
  birthdate: string;
  gender: string;
  nid: string;
  hashnid?: string;
  telephone: string;
  address: string;
  country: string;
  appPermissions?: UserPermission[];
  su?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type ModifiedUser = {
  id: string,
  result: string;
};

export type dependantUser = {
  [key: string]: string | string[] | UserPermission[]
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  nid: string;
  telephone: string;
  address: string;
  country: string;
  su?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type CreateUser = {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  nid: string;
  telephone: string;
  address: string;
  country: string;
  userFactories: UserFactory[];
  appPermissions?: UserPermission[];
  su?: boolean;
};

export type EditUser = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  lastname?: string;
  birthdate?: string;
  gender?: string;
  nid?: string;
  telephone?: string;
  address?: string;
  country?: string;
  userFactories?: UserFactory[];
  appPermissions?: UserPermission[];
  su?: boolean;
};
