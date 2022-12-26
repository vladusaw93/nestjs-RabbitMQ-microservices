import {Body, Controller} from '@nestjs/common';
import {RMQRoute} from "nestjs-rmq";

import {AccountLogin, AccountLogout, AccountRefresh, AccountRegister} from "@microservices/contracts";
import {AuthService} from "../service";
import {GetCurrentUserId} from "../../../../../api/src/app/decorators";

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @RMQRoute(AccountRegister.topic)
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return this.authService.register(dto);
  }

  @RMQRoute(AccountLogin.topic)
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
    return this.authService.login(dto);
  }

  @RMQRoute(AccountLogout.topic)
  async logout(@GetCurrentUserId() user_id: string) {
    return this.authService.logout(user_id);
  }

  @RMQRoute(AccountRefresh.topic)
  async refresh(@Body() {refresh_token, user_id}: AccountRefresh.Request): Promise<AccountRefresh.Response> {
    return this.authService.refreshTokens(user_id, refresh_token);
  }
}

