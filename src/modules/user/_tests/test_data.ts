export const testData = {
  helpers: {
    invalidEmail: {
      email: 'invalidEmail.com',
    },
    validEmail: {
      email: 'valid@valid.com',
    },
    noEmail: {
      email: '',
    },
    invalidPhoneNumber: {
      phone: '12345',
      countryCode: 'US',
      internationalFormat: '+1-12345',
    },
    validPhoneNumber: {
      phone: '+14155552671',
      countryCode: 'US',
      internationalFormat: '+1-415-555-2671',
    },
    noCountryCodePhone: {
      phone: '+14155552671',
      internationalFormat: '+1-415-555-2671',
    },
    noInternationalFormatPhone: {
      phone: '+14155552671',
      countryCode: 'US',
    },
  },
};
