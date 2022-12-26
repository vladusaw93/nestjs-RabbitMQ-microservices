import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import {UserModule} from "../user/user.module";
import {AuthController} from './controller';
import {getJwtConfig} from "../configs";
import {AuthService} from './service';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
