import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import mongoose, { ClientSession, Connection } from 'mongoose';
import { UserAccountService } from 'src/user-accounts/services/user-account.service';
import { AccountTransactionRepository } from './repositories/account-transaction.repository';
import { TransactionType } from './enums/transaction-type.enum';
import { AccountTransaction } from './schemas/account-transaction.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { TopUpParams } from './params/top-up.params';
import { ChargeParams } from './params/charge.params';

@Injectable()
export class AccountTransactionsService {
  constructor(
    private readonly accountTransactionRepository: AccountTransactionRepository,
    private readonly userAccountService: UserAccountService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private async createTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    transactionId: string,
    session?: ClientSession,
  ): Promise<AccountTransaction> {
    const existingTransaction = await this.accountTransactionRepository.findOne(
      {
        transactionId,
      },
    );

    if (existingTransaction) {
      throw new ConflictException('Duplicate transaction');
    }

    return this.accountTransactionRepository.create(
      {
        userId,
        type,
        amount,
        transactionId,
      },
      session,
    );
  }

  async topUp(topUpParams: TopUpParams): Promise<void> {
    const { userId, amount, transactionId } = topUpParams;

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // 1) update user account balance (increase)
      await this.userAccountService.updateBalance(userId, amount, session);

      // 2) create transaction to be a history
      await this.createTransaction(
        userId,
        TransactionType.TOP_UP,
        amount,
        transactionId,
        session,
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to top up account', error.message);
    } finally {
      session.endSession();
    }
  }

  async charge(chargeParams: ChargeParams): Promise<void> {
    const { userId, amount, transactionId } = chargeParams;

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // 1) update user account balance (decrease)
      await this.userAccountService.updateBalance(userId, -amount, session);

      // 2) create transaction to be a history
      await this.createTransaction(
        userId,
        TransactionType.CHARGE,
        amount,
        transactionId,
        session,
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Failed to charge account', error.message);
    } finally {
      session.endSession();
    }
  }
}
