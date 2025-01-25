import { AppError } from "../AppError";

class NotAuthorizedError extends AppError {
  public statusCode = 401;
  constructor(customMessage: string = "Not Authorized") {
    super(customMessage);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}

export { NotAuthorizedError };
