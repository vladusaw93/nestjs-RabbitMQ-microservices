import {IUser, UserRole} from "@microservices/interfaces";

export class UserEntity implements IUser {
  _id?: string;
  email: string;
  role: UserRole;
  display_name?: string;
  password: string;

  constructor(user: IUser) {
    this._id = user._id;
    this.role = user.role;
    this.email = user.email;
    this.display_name = user.display_name
    this.password = user.password
  }
}
