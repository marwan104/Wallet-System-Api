import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_VALIDATION_SCHEMA } from './common/configuration/env-validation-schema';
import configuration from './common/configuration/configuration';
import { ConfigurationType } from './common/configuration/configuration.interface';
import { UsersModule } from './users/users.module';
import { UserAccountsModule } from './user-accounts/user-account.module';
import { AccountTransactionsModule } from './account-transactions/account-transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validationSchema: ENV_VALIDATION_SCHEMA,
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<ConfigurationType>) => ({
        uri: configService.getOrThrow<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    UserAccountsModule,
    AccountTransactionsModule,
  ],
})
export class AppModule {}
