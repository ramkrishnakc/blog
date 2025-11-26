export const MSG = {
  alreadyInUse: (str: string) => `${str} is already in use`,
  isRequired: (str: string) => `${str} is required`,
  invalid_email: 'Please fill a valid email address',
  admin_exists: 'Admin user already exists',
  admin_created: 'Admin user created successfully',
  admin_creation_error: 'Error creating admin user',
  user_not_found: 'User not found',
  incorrect_old_pwd: 'Old password is incorrect',
  old_new_pwd_required: 'Old password and new password are required',
  email_required: 'Email is required for email update',
  phn_required: 'Phone number is required for phone update',
  phn_code_required:
    'Country code & international format are required when phone number is provided',
  invalid_phn: 'Please provide a valid phone number',
};
