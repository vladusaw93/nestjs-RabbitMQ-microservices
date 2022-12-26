export namespace AccountLogout {
  export const topic = 'account.logout.command';

  export class Request{}

  export class Response {
   success: boolean;
  }

}
