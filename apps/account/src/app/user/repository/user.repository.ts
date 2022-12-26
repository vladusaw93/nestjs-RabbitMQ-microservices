import {InjectModel} from "@nestjs/mongoose";
import {User} from "../models";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {UserEntity} from "../entities";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async createUser(user: UserEntity) {
    const new_user = new this.userModel(user);
    return new_user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  async updateUser(_id: string, userUpdates): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id }, userUpdates);
  }

  async findById(_id: string): Promise<User>{
    return this.userModel.findById(_id);
  }
}
