const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};
