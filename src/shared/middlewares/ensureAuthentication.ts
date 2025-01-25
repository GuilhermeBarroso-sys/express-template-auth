import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/httpErrors/NotAuthorizedError";
import { verify } from "jsonwebtoken";
interface Payload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
export function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    throw new NotAuthorizedError("Token not provided.");
  }
  const [, token] = bearerToken.split(" ");
  try {
    const user = verify(token, process.env.JWT_SECRET!) as Payload;
    req.user = user;
  } catch (err: any) {
    throw new NotAuthorizedError(err.message);
  }
  return next();
}
