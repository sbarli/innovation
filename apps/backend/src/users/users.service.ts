import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getCatchErrorMessage } from '@inno/utils';

import { CreateUserInput } from './dto/create-user.dto';
import { FindUsersInput } from './dto/find-users.dto';
import { isMongoDuplicateKeyError } from './helpers/mongo-validation';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsernameByRef(ref: string): Promise<string> {
    try {
      const user = await this.userModel.findById(ref);
      if (!user?.username) {
        throw new Error('usersService.getUsernameByRef -> username not found');
      }
      return user.username;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error ?? 'usersService.findUsers -> Failed to find users')
      );
    }
  }

  async findUserByRef(ref: string): Promise<User | undefined | null> {
    return this.userModel.findById(ref);
  }

  async findUserByEmail(email: string): Promise<User | undefined | null> {
    return this.userModel.findOne({ email });
  }

  async findUsers(searchData: FindUsersInput): Promise<User[]> {
    const fieldName = searchData.searchField === 'ref' ? '_id' : searchData.searchField;
    try {
      return this.userModel.find({
        [fieldName]: { $in: searchData.searchValues },
      });
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error ?? 'usersService.findUsers -> Failed to find users')
      );
    }
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
