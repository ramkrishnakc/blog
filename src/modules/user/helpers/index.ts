import { isValidPhoneNumber } from 'libphonenumber-js';

import { MSG } from 'src/common/constants/messages';
import * as dtos from '../dto';
import { UserDocument } from '../entities/user.schema';
import { EMAIL_REGEXP } from 'src/common/constants';
import { CountryCode } from 'src/common/constants/types';

export function validatePhoneNumber(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (data.phone && (!data.countryCode || !data.internationalFormat)) {
    throw new Error(MSG.phn_code_required);
  }
  if (data.phone) {
    if (!isValidPhoneNumber(data.phone, data.countryCode as CountryCode)) {
      throw new Error(MSG.invalid_phn);
    }
    return true;
  }
  if (isUpdate) {
    if (!data.phone) throw new Error(MSG.phn_required);
    return !!(data.phone && data.phone !== user?.phone);
  }
  return true;
}

export function validateEmail(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (!data.email) throw new Error(MSG.email_required);

  if (!EMAIL_REGEXP.test(data.email)) throw new Error(MSG.invalid_email);

  if (isUpdate) return data.email !== user?.email;
  return true;
}
