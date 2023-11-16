import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getCatchErrorMessage } from '@inno/utils';

import { CreateUserInput } from './dto/create-user.dto';
import { isMongoDuplicateKeyError } from './helpers/mongo-validation';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByRef(ref: string): Promise<User | undefined | null> {
    return this.userModel.findById(ref);
  }

  async findUserByEmail(email: string): Promise<User | undefined | null> {
    return this.userModel.findOne({ email });
  }

  async createUser(newUserData: CreateUserInput): Promise<User> {
    try {
      return this.userModel.create(newUserData);
    } catch (error) {
      const catchErrorMessage =
        getCatchErrorMessage(error) ?? 'usersService.createUser -> Unable to create new user';
      throw new Error(
        isMongoDuplicateKeyError(catchErrorMessage)
          ? 'usersService.createUser -> Unable to create new user, user already exists with this email'
          : catchErrorMessage
      );
    }
  }
}
