import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-use-id.decorator';
import { Serialize } from 'src/interceptors/serializeInterceptor';
import { UserDto } from './dto/user.dto';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('/categories')
  updateCategories(
    @GetUserId() userId: string,
    @Body('categories') categories: string[],
  ) {
    return this.usersService.updateCategories(userId, categories);
  }
}
