import { AppError } from "../AppError";

class BadRequestError extends AppError {
  public statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export { BadRequestError };
