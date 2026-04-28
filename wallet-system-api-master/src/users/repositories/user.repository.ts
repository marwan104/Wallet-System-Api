import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { BaseRepository } from 'src/common/abstraction-repository/repositories/base-repository';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(ModelName.USER) model: Model<UserDocument>,
  ) {
    super(model);
  }
}
