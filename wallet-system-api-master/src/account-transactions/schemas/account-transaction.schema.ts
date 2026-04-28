import { HydratedDocument, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ModelName } from 'src/common/abstraction-repository/enums/model-name.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export type AccountTransactionDocument = HydratedDocument<AccountTransaction>;

@Schema({
  timestamps: true,
})
export class AccountTransaction {
  _id?: string;

  @Prop({ type: Types.ObjectId, ref: ModelName.USER, required: true })
  userId: string;

  @Prop({ required: true, enum: TransactionType })
  type: string;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ type: String, required: true, unique: true })
  transactionId: string;
}

export const AccountTransactionSchema =
  SchemaFactory.createForClass(AccountTransaction);
