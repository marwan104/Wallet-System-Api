import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';
import { BaseRepository } from 'src/common/abstraction-repository/repositories/base-repository';
import {
  AccountTransaction,
  AccountTransactionDocument,
} from '../schemas/account-transaction.schema';

@Injectable()
export class AccountTransactionRepository extends BaseRepository<AccountTransactionDocument> {
  constructor(
    @InjectModel(ModelName.ACCOUNT_TRANSACTION)
    private accountTransactionModel: Model<AccountTransactionDocument>,
  ) {
    super(accountTransactionModel);
  }
}
