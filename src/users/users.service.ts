import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import {
  EmailAlreadyTakenException,
  UsernameAlreadyTakenException,
} from 'src/common/custom-errors/customErrors';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByUserId(userId: string): Promise<User> {
    const id = new ObjectId(userId);
    const user = await this.userModel.findOne({ _id: id }).exec();
    return user;
  }

  async findOneByUserName(username: string): Promise<User | null> {
    username = username.toLowerCase();
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userToLower = createUserDto.username.toLowerCase();
    const emailToLower = createUserDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({
      $or: [{ username: userToLower }, { email: emailToLower }],
    });
    if (existingUser) {
      if (existingUser.username === userToLower) {
        throw new UsernameAlreadyTakenException();
      }
      if (existingUser.email === emailToLower) {
        throw new EmailAlreadyTakenException();
      }
    }
    const newUser = new this.userModel({
      ...createUserDto,
      username: userToLower,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async updateCategories(userId: string, categories: string[]): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { $set: { categories } }, { new: true })
      .exec();
    return updatedUser;
  }
}
