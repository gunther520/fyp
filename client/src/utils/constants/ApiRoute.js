const development = "http://localhost:3001";

const API_ROUTE_PATHS = {
  signup: `${development}/users/signup`,
  login: `${development}/users/login`,
  sendEmailVerificationCode: `${development}/users/signup/send-verification-code`,
  resendEmailVerificationCode: `${development}/users/signup/resend-verification-code`,
  verifyCode: `${development}/users/signup/verify-code`,
};

export default API_ROUTE_PATHS;
