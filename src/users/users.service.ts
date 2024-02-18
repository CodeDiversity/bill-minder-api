import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByUserId(userId: string): Promise<User[]> {
    return this.userModel.find({ userId }).exec();
  }

  async findOneByUserName(username: string): Promise<User | null> {
    username = username.toLowerCase();
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userToLower = createUserDto.username.toLowerCase();
    const newUser = new this.userModel({
      ...createUserDto,
      username: userToLower,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
