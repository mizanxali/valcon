import config from 'config';
import jwt from 'jsonwebtoken';

const jwtSecret = config.get<string>('jwtSecret');

export function signJwt(payload: object) {
  return jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
}
