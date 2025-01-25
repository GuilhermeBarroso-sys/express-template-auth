import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
interface IError {
  message: string;
  path?: string;
}

function serializeError(error: string): IError[] {
  return [{ message: error }];
}
export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: error.statusCode,
      message: serializeError(error.message),
      timestamp: new Date().toISOString(),
      path: request.path,
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      status: 400,
      message: error.errors.map((issue) => ({ message: issue.message, field: issue.path })),
      timestamp: new Date().toISOString(),
      path: request.path,
    });
    return;
  }
  response.status(500).json({
    status: 500,
    message: serializeError("Internal server error"),
    timestamp: new Date().toISOString(),
    path: request.path,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
}
