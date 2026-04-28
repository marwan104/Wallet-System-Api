import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { FilterQuery } from 'mongoose';
import { User } from './schemas/user.schema';
import { PaginatedResult } from 'src/common/abstraction-repository/models/paginated-result.model';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    name?: string;
  }): Promise<PaginatedResult<User>> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const filterQuery: FilterQuery<User> = {};

    if (query.name) {
      filterQuery.name = { $regex: new RegExp(query.name, 'i') };
    }

    return await this.userRepository.findPaginated(filterQuery, {
      page,
      limit,
      sort: { createdAt: -1 },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
