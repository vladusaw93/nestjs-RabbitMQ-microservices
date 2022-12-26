import {UserRole} from "@microservices/interfaces";

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    email: string;
    password: string;
    display_name?: string;
    role?: UserRole;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }

}
