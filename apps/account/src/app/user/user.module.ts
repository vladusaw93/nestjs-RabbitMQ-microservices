import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models";
import {UserRepository} from "./repository";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserModule {
}
