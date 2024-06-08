import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-use-id.decorator';
import { Serialize } from 'src/interceptors/serializeInterceptor';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOneByUserName(username);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findById(@GetUserId() userId: string) {
    return this.usersService.findByUserId(userId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(@GetUserId() userId: string, @Body() user: User) {
    return this.usersService.update(userId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/categories')
  updateCategories(
    @GetUserId() userId: string,
    @Body('categories') categories: string[],
  ) {
    return this.usersService.updateCategories(userId, categories);
  }
}
