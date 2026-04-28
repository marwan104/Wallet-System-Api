import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';
import {
  UserAccount,
  UserAccountDocument,
} from '../schemas/user-account.schema';
import { BaseRepository } from 'src/common/abstraction-repository/repositories/base-repository';

@Injectable()
export class UserAccountRepository extends BaseRepository<UserAccountDocument> {
  constructor(
    @InjectModel(ModelName.USER_ACCOUNT)
    private userAccountModel: Model<UserAccountDocument>,
  ) {
    super(userAccountModel);
  }

  async findByUserAccountByUserId(
    userId: string,
  ): Promise<UserAccountDocument | null> {
    return this.userAccountModel.findOne({ userId }).exec();
  }
}
