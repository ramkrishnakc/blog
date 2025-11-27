import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DEFAULT_USER_ROLE, EMAIL_REGEXP, USER_ROLES } from 'src/common/constants';
import { MSG } from 'src/common/constants/messages';
import { validateEmail } from 'src/common/utils';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, MSG.isRequired('Name')], trim: true })
  name: string;

  @Prop({
    required: [true, MSG.isRequired('Email')],
    trim: true,
    lowercase: true,
    unique: [true, MSG.alreadyInUse('Email')],
    validate: [validateEmail, MSG.invalid_email],
    match: [EMAIL_REGEXP, MSG.invalid_email],
  })
  email: string;

  @Prop({
    trim: true,
    unique: [true, MSG.alreadyInUse('Phone number')],
  })
  phone?: string;
  // Field for storing international format
  @Prop({ trim: true })
  internationalFormat?: string;
  // Field for storing country code
  @Prop({ trim: true })
  countryCode?: string;
  // date of birth
  @Prop({ trim: true })
  dateOfBirth?: Date;

  @Prop({
    required: [true, MSG.isRequired('Pasword')],
    trim: true,
  })
  password: string;
  @Prop({
    required: [true, MSG.isRequired('Encryption Salt')],
    trim: true,
  })
  encryptionKey: string;

  @Prop({
    enum: {
      values: [USER_ROLES.ADMIN, USER_ROLES.USER],
      message: 'Invalid role',
    },
    default: DEFAULT_USER_ROLE,
  })
  role: string;

  @Prop({ default: false })
  emailVerified?: boolean;
  @Prop({ default: false })
  phoneVerified?: boolean;
  @Prop({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
