import { EMAIL_REGEXP } from '../constants';

export const validateEmail = (email: string) => EMAIL_REGEXP.test(email);
