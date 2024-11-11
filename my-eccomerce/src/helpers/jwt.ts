import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

let secret_key = process.env.SECRET_KEY || "secret";
export const signToken = (payload: object) => jwt.sign(payload, secret_key);

export const verifyToken = (token: string) => jwt.verify(token, secret_key);

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret_key);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);
  return payloadJose;
};
