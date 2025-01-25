import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.body);
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
