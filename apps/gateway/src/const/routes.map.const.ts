export const RoutesMapConst = {
  '/auth/registration': { service: 'AuthService', method: 'Register' },
  '/auth/login': { service: 'AuthService', method: 'Login' },
  '/users': { service: 'UserService', method: 'GetUser' },
  '/products': { service: 'ProductService', method: 'ListProducts' },
};
