import passport from 'passport';

const pathsToBypassAuthentication = [
  {
    path: '/auth/login',
    method: 'POST',
  },
  {
    path: '/users',
    method: 'POST',
  },
];

const authenticateJWT = passport.authenticate('jwt', { session: false });

export function applyJWTAuthentication(req, res, next) {
  if (
    pathsToBypassAuthentication.some(
      (element) => element.path === req.path && element.method === req.method
    )
  ) {
    return next();
  }
  authenticateJWT(req, res, next);
}
