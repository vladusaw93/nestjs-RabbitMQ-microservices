import {Injectable} from '@nestjs/common';
import {UserRepository} from "../../user/repository";
import {UserEntity} from "../../user/entities";
import {ITokens, UserRole} from "@microservices/interfaces";
import {JwtService} from "@nestjs/jwt";
import {AccountLogin, AccountLogout, AccountRegister} from "@microservices/contracts";
import {AccessDeniedError, UserExist} from "../../user/errors";
import * as bcrypt from 'bcrypt'
import {ConfigService} from "@nestjs/config";
import {User} from "../../user/models";

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository,
              private readonly jwtService: JwtService,
              private readonly configService: ConfigService) {
  }

  async register(user: AccountRegister.Request): Promise<AccountRegister.Response> {
    const candidate = await this.userRepository.findByEmail(user.email);
    if (candidate) UserExist();

    user.password = await this.hasData(user.password);

    const role = user.role ? user.role : UserRole.Student;

    const new_user = new UserEntity({...user, role})
    const created_user = await this.userRepository.createUser(new_user);

    const tokens = await this.getTokens(created_user);
    await this.updateRtHash(created_user._id, tokens.refresh_token);

    return tokens;
  }


  async login({email, password}: AccountLogin.Request):Promise<AccountLogin.Response> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) AccessDeniedError();

    const password_matches = await bcrypt.compare(password, user.password);

    if (!password_matches) AccessDeniedError();

    const tokens = await this.getTokens(user);

    await this.updateRtHash(user, tokens.refresh_token);
    return tokens;
  }

  async hasData(data): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(user: User): Promise<ITokens> {
    const {_id, email, role} = user;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {_id, email, role},
        {secret: this.configService.get<string>('AT_SECRET'), expiresIn: '15m'},
      ),

      this.jwtService.signAsync(
        {_id, email, role},
        {secret: this.configService.get<string>('RT_SECRET'), expiresIn: '7d'},
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(user: User, rt: string): Promise<void> {
    const hash = await this.hasData(rt);

    await this.userRepository.updateUser(user._id, {
      tokens: {...user.tokens, refresh_token: hash},
    });
  }

  async logout(_id: string): Promise<AccountLogout.Response> {
    const user = await this.userRepository.findById(_id);

    await this.userRepository.updateUser(_id, {
      tokens: {...user.tokens, refresh_token: null},
    });

    return {success: true};
  }

  async refreshTokens(_id: string, rt: string) {
    const user = await this.userRepository.findById(_id);

    if (!user.tokens.refresh_token) AccessDeniedError();

    const rt_matches = bcrypt.compare(rt, user.tokens.refresh_token);

    if (!rt_matches) AccessDeniedError();

    const tokens = await this.getTokens(user);

    await this.updateRtHash(user, tokens.refresh_token);

    return tokens;
  }


}
