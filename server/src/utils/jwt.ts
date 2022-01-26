import config from 'config';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.jwtSecret as string;

export function signJwt(payload: object) {
  return jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, jwtSecret) as T;
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
}
