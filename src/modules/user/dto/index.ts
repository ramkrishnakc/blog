import { Types } from 'mongoose';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { USER_ROLES } from 'src/common/constants';
import { UserUpdateCases } from 'src/common/constants/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly internationalFormat?: string;

  @IsOptional()
  readonly countryCode?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateAdminUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly encryptionKey: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum([USER_ROLES.ADMIN])
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  readonly emailVerified: true;

  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  readonly phoneVerified: true;
}

export class UpdateUserDto {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly email?: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly internationalFormat?: string;

  @IsOptional()
  readonly countryCode?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsOptional()
  readonly oldPassword?: string;

  @IsOptional()
  readonly newPassword?: string;

  @IsNotEmpty()
  @IsEnum(UserUpdateCases)
  readonly updateUseCase: UserUpdateCases;
}

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  readonly createdAt?: Date;

  @IsOptional()
  readonly updatedAt?: Date;

  @IsOptional()
  readonly emailVerified?: boolean;

  @IsOptional()
  readonly phoneVerified?: boolean;

  @IsOptional()
  readonly internationalFormat?: string;

  @IsOptional()
  readonly countryCode?: string;
}
