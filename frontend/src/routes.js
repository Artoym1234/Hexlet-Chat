const apiPath = '/api/v1';

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
};

const pageRoutes = {
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};

export { apiRoutes, pageRoutes };
