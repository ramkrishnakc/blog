import { Model } from 'mongoose';
import { isEmpty } from 'lodash';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import * as dtos from './dto';
import { USER_ROLES } from 'src/common/constants';
import { Encryption } from 'src/core/encryption';
import { CustomLoggerService } from 'src/core/logger.service';
import { MSG } from 'src/common/constants/messages';
import { UserUpdateCases } from 'src/common/constants/enums';
import { validateEmail, validatePhoneNumber } from './helpers';

const getUserResponse = (obj: UserDocument) => ({
  id: obj._id,
  name: obj.name,
  email: obj.email,
  phone: obj.phone,
  dateOfBirth: obj.dateOfBirth,
  role: obj.role,
  internationalFormat: obj.get('internationalFormat') as string,
  countryCode: obj.get('countryCode') as string,
  createdAt: obj.get('createdAt') as Date,
  updatedAt: obj.get('updatedAt') as Date,
});

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    private readonly logger: CustomLoggerService,
  ) {}

  async saveUser(data: dtos.CreateUserDto | dtos.CreateAdminUserDto, role: string) {
    const { pwd: password, encKey: encryptionKey } = await Encryption.encrypt(data.password ?? '');

    const createdUser = new this.UserModel({
      ...data,
      password,
      encryptionKey,
      role,
    });
    return await createdUser.save();
  }

  // Create admin user if needed - special case
  async onModuleInit() {
    const adminExist = await this.UserModel.exists({
      role: USER_ROLES.ADMIN,
    }).exec();

    if (adminExist) return this.logger.log(MSG.admin_exists);

    try {
      const data = JSON.parse(process.env.ADMIN_USER || '{}') as dtos.CreateAdminUserDto;
      await this.saveUser(data, USER_ROLES.ADMIN);
      this.logger.log(MSG.admin_created);
    } catch (e) {
      this.logger.error(MSG.admin_creation_error, e as Error);
    }
  }

  async createUser(data: dtos.CreateUserDto): Promise<dtos.UserResponseDto> {
    validateEmail(data);
    validatePhoneNumber(data);
    const result = await this.saveUser(data, USER_ROLES.USER);
    return getUserResponse(result);
  }

  async findAll(): Promise<dtos.UserResponseDto[]> {
    const results = await this.UserModel.find({ role: USER_ROLES.USER }).exec();
    return results.map(getUserResponse);
  }

  async findOne(id: string): Promise<dtos.UserResponseDto> {
    const result = await this.UserModel.findById(id).exec();
    if (!result) throw new Error(MSG.user_not_found);

    return getUserResponse(result as unknown as UserDocument);
  }

  async prepareUpdateData(
    user: UserDocument,
    data: dtos.UpdateUserDto,
  ): Promise<Partial<UserDocument>> {
    const newData: Partial<UserDocument> = {};

    switch (data.updateUseCase) {
      case UserUpdateCases.PWD: {
        if (!data.oldPassword || !data.newPassword) throw new Error(MSG.old_new_pwd_required);

        const decryptedPwd = Encryption.decrypt(user.password, user.encryptionKey);
        if (decryptedPwd !== data.oldPassword) throw new Error(MSG.incorrect_old_pwd);

        const { pwd: newEncryptedPwd, encKey: newEncKey } = await Encryption.encrypt(
          data.newPassword,
        );

        newData.password = newEncryptedPwd;
        newData.encryptionKey = newEncKey;
        break;
      }

      case UserUpdateCases.EMAIL: {
        if (validateEmail(data, user, true)) {
          newData.email = data.email;
          newData.emailVerified = false;
        }
        break;
      }

      case UserUpdateCases.PHONE: {
        if (validatePhoneNumber(data, user, true)) {
          newData.phone = data.phone;
          newData.internationalFormat = data.internationalFormat;
          newData.countryCode = data.countryCode;
          newData.phoneVerified = false;
        }
        break;
      }

      case UserUpdateCases.INFO: {
        if (data.name && data.name !== user.name) newData.name = data.name;
        if (data.dateOfBirth && data.dateOfBirth !== user.dateOfBirth)
          newData.dateOfBirth = data.dateOfBirth;
        break;
      }

      default:
        throw new Error('Invalid update case');
    }

    return newData;
  }

  async update(id: string, data: dtos.UpdateUserDto): Promise<dtos.UserResponseDto> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) throw new Error(`Couldn't update: ${MSG.user_not_found}`);

    const newData: Partial<UserDocument> = await this.prepareUpdateData(user, data);
    if (isEmpty(newData)) return getUserResponse(user as unknown as UserDocument);

    const obj = await this.UserModel.findByIdAndUpdate(id, newData).exec();
    return { ...getUserResponse(obj as unknown as UserDocument), ...newData };
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.UserModel.findByIdAndUpdate(id, { isActive: false }).exec();
    if (!result) throw new Error(`Couldn't remove: ${MSG.user_not_found}`);

    return { message: 'User removed successfully' };
  }
}
