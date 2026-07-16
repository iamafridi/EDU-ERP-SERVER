import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const signToken = (payload: { uid: string; email: string; role: string; domainAdminType?: string; staffSubRole?: string; userId: string; profileId: string; profileType: string }) => {
  return jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as string,
  } as jwt.SignOptions);
};

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt_secret as string) as JwtPayload;
};

export const JwtHelpers = { signToken, verifyToken };
