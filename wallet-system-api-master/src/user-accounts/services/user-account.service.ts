import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { CreateUserAccountDto } from '../dtos/create-user-account.dto';
import { UpdateBalanceDto } from '../dtos/update-balance.dto';
import {
  UserAccount,
  UserAccountDocument,
} from '../schemas/user-account.schema';
import { UsersService } from 'src/users/users.service';
import { ClientSession } from 'mongoose';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly userAccountRepository: UserAccountRepository,
    private readonly usersService: UsersService,
  ) {}

  async createAccount(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccount> {
    // check if user exists
    await this.usersService.findById(createUserAccountDto.userId);

    const existingAccount =
      await this.userAccountRepository.findByUserAccountByUserId(
        createUserAccountDto.userId,
      );

    if (existingAccount) {
      throw new BadRequestException('Account already exists');
    }

    return this.userAccountRepository.create(createUserAccountDto);
  }

  async getMyAccount(userId: string): Promise<UserAccountDocument> {
    const account =
      await this.userAccountRepository.findByUserAccountByUserId(userId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account.populate({
      path: 'userId',
      select: 'name _id',
    });
  }

  async updateBalance(
    userId: string,
    amount: number,
    session?: ClientSession,
  ): Promise<UserAccountDocument | null> {
    const account =
      await this.userAccountRepository.findByUserAccountByUserId(userId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.balance = parseFloat((account.balance + amount).toFixed(2));

    if (account.balance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.userAccountRepository.update(
      account._id,
      {
        balance: account.balance,
      },
      session,
    );
  }
}
