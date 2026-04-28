import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccount, UserAccountSchema } from './schemas/user-account.schema';
import { UserAccountService } from './services/user-account.service';
import { UserAccountRepository } from './repositories/user-account.repository';
import { UserAccountsController } from './user-accounts.controller';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.USER_ACCOUNT, schema: UserAccountSchema },
    ]),
    UsersModule,
  ],
  controllers: [UserAccountsController],
  providers: [UserAccountService, UserAccountRepository],
  exports: [UserAccountService],
})
export class UserAccountsModule {}
