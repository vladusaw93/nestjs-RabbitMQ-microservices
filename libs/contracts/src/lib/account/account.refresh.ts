export namespace AccountRefresh {
  export const topic = 'account.refresh.command';

  export class Request {
    user_id: string;
    refresh_token: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }

}
