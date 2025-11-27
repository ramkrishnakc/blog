import { CreateUserDto } from '../dto';
import { validatePhoneNumber, validateUserEmail } from '../helpers';
import { testData } from './test_data';
import { MSG } from 'src/common/constants/messages';
import { UserDocument } from '../entities/user.schema';

describe('Helper functions test', () => {
  describe('validateUserEmail', () => {
    it('should test "email required" case', () => {
      try {
        validateUserEmail(testData.helpers.noEmail as unknown as CreateUserDto);
      } catch (error) {
        expect((error as Error).message).toBe(MSG.email_required);
      }
    });

    it('should test "invalid email" case', () => {
      try {
        validateUserEmail(testData.helpers.invalidEmail as unknown as CreateUserDto);
      } catch (error) {
        expect((error as Error).message).toBe(MSG.invalid_email);
      }
    });

    it('should test "valid email" case', () => {
      expect(() => {
        validateUserEmail(testData.helpers.validEmail as unknown as CreateUserDto);
      }).not.toThrow();
      expect(validateUserEmail(testData.helpers.validEmail as unknown as CreateUserDto)).toBe(true);
    });

    it('should test "update" email case', () => {
      const bool = validateUserEmail(
        testData.helpers.validEmail as unknown as CreateUserDto,
        testData.helpers.invalidEmail as unknown as UserDocument,
        true,
      );
      expect(bool).toBe(true);
    });

    it('should test not "update" email case', () => {
      const bool = validateUserEmail(
        testData.helpers.validEmail as unknown as CreateUserDto,
        testData.helpers.validEmail as unknown as UserDocument,
        true,
      );
      expect(bool).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should test "invalid phone number" case', () => {
      try {
        validatePhoneNumber(testData.helpers.invalidPhoneNumber as unknown as CreateUserDto);
      } catch (error) {
        expect((error as Error).message).toBe(MSG.invalid_phn);
      }
    });

    it('should test "valid phone number" case', () => {
      expect(
        validatePhoneNumber(testData.helpers.validPhoneNumber as unknown as CreateUserDto),
      ).toBe(true);
    });

    it('should test "phone number" is optional for Create case', () => {
      expect(validatePhoneNumber({} as unknown as CreateUserDto)).toBe(true);
    });

    it('should test "country code & international format" required if phone is present case', () => {
      try {
        validatePhoneNumber(testData.helpers.noCountryCodePhone as unknown as CreateUserDto);
      } catch (error) {
        expect((error as Error).message).toBe(MSG.phn_code_required);
      }

      try {
        validatePhoneNumber(
          testData.helpers.noInternationalFormatPhone as unknown as CreateUserDto,
        );
      } catch (error) {
        expect((error as Error).message).toBe(MSG.phn_code_required);
      }
    });

    it('should test "phone number" is required for "Update phone" case', () => {
      try {
        validatePhoneNumber(
          testData.helpers.validPhoneNumber as unknown as CreateUserDto,
          testData.helpers.validPhoneNumber as unknown as UserDocument,
          true,
        );
      } catch (error) {
        expect((error as Error).message).toBe(MSG.invalid_phn);
      }
    });

    it('should test "update" phone case', () => {
      const bool = validatePhoneNumber(
        testData.helpers.validPhoneNumber as unknown as CreateUserDto,
        testData.helpers.invalidPhoneNumber as unknown as UserDocument,
        true,
      );
      expect(bool).toBe(true);
    });

    it('should test "not update" phone case', () => {
      const bool = validatePhoneNumber(
        testData.helpers.validPhoneNumber as unknown as CreateUserDto,
        testData.helpers.validPhoneNumber as unknown as UserDocument,
        true,
      );
      expect(bool).toBe(false);
    });
  });
});
