export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student'
}

export interface IUser {
  _id?: string;
  display_name?: string;
  email: string;
  password: string;
  role: UserRole;
  tokens?: {
    refresh_token?: string;
    confirmation_token?: string;
  }
}
