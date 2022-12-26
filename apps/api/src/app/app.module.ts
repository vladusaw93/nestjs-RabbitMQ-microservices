import {Module} from '@nestjs/common';
import {AuthController} from "./controllers";
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {getJwtConfig, getRMQConfig} from "./configs";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserController} from "./controllers/user.controller";
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "./guards";
import {AtStrategy, RtStrategy} from "./strategies";


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'envs/.api.env', isGlobal: true}),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule
  ],
  controllers: [AuthController, UserController],
  providers:[RtStrategy, AtStrategy, { provide: APP_GUARD, useClass: AtGuard }]
})
export class AppModule {
}
