import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelName.USER, schema: UserSchema }]),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
