import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';

export type UserAccountDocument = UserAccount & Document;

@Schema({ timestamps: true })
export class UserAccount {
  _id: string;

  @Prop({
    type: Types.ObjectId,
    ref: ModelName.USER,
    required: true,
    unique: true,
  })
  userId: string;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  balance: number;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
