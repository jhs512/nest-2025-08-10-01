import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: { name: string; email: string }): Promise<User> {
    return this.usersService.create(createUserDto.name, createUserDto.email);
  }
}
