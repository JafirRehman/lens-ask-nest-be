import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/user.dtos';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('find-all')
  @UsePipes(new ValidationPipe())
  async findAll() {
    return await this.userService.findAll();
  }

  @Delete('clear-all-users')
  @UsePipes(new ValidationPipe())
  async clearAllUsers() {
    return await this.userService.clearAllUsers();
  }
}
