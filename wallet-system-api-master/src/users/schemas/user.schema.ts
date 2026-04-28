import { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id?: string;
  @Prop({ required: true })
  name: string;

  @Prop({ type: Boolean, default: false })
  blocked?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
