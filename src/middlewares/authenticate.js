import createHttpError from 'http-errors';

import { Session } from '../models/session.js';

import { User } from '../models/user.js';

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError.Unauthorized('Please provide acces token'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError.Unauthorized('Please provide acces token'));
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError.Unauthorized('Session is not found!'));
  }
  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError.Unauthorized('Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (user === null) {
    return next(createHttpError.Unauthorized('User is not found!'));
  }

  req.user = { id: user._id, name: user.name };

  next();
}
