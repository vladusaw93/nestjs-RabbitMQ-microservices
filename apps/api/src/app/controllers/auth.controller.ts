import {Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AccountLogin, AccountLogout, AccountRefresh, AccountRegister} from "@microservices/contracts";
import {RMQService} from "nestjs-rmq";

import {LoginDto, RegisterDto} from "../dto";
import {GetCurrentUser, GetCurrentUserId, Public} from "../decorators";
import {RtGuard} from "../guards";

@Controller('auth')
export class AuthController {

  constructor(private readonly rmqService: RMQService) {
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDto): Promise<AccountRegister.Response> {
    try {
      return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AccountLogin.Response> {
    try {
      return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }

  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logut(@GetCurrentUserId() user_id: string) {
    try {
      return this.rmqService.send<AccountLogout.Request, AccountLogout.Response>(AccountLogout.topic, user_id);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }

  @Public()
  @Post('refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@GetCurrentUserId() user_id: string, @GetCurrentUser('refresh_token') refresh_token: string) {
    try {
      return this.rmqService.send<AccountRefresh.Request, AccountRefresh.Response>(AccountRefresh.topic, {
        user_id,
        refresh_token
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}

