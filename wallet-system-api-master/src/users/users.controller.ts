import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindUsersDto } from './dtos/find-users.dto';
import { User } from './schemas/user.schema';
import { SwaggerTags } from 'src/common/swagger/constatnt';
import { PaginatedResult } from 'src/common/abstraction-repository/models/paginated-result.model';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags(SwaggerTags.USER)
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async find(@Query() query: FindUsersDto): Promise<PaginatedResult<User>> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
