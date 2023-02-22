export interface IUserOption {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IUser {
  data: IUserOption[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface IGetUserResponse {
  users: IUser | undefined;
}
