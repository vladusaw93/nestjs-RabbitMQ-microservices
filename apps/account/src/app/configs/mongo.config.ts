import {MongooseModuleAsyncOptions} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({uri: configService.get<string>('DB_URL')}),
    inject: [ConfigService],
    imports: [ConfigModule]
  }
}
