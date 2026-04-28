import { Module } from '@nestjs/common';
import { AccountTransactionsController } from './account-transactions.controller';
import { AccountTransactionsService } from './account-transactions.service';
import { AccountTransactionSchema } from './schemas/account-transaction.schema';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccountsModule } from 'src/user-accounts/user-account.module';
import { AccountTransactionRepository } from './repositories/account-transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.ACCOUNT_TRANSACTION,
        schema: AccountTransactionSchema,
      },
    ]),
    UserAccountsModule,
  ],
  controllers: [AccountTransactionsController],
  providers: [AccountTransactionsService, AccountTransactionRepository],
})
export class AccountTransactionsModule {}
