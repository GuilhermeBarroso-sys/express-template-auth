import { AppError } from "../AppError";

class NotFoundError extends AppError {
  public statusCode = 404;

  constructor(message = "Not Found") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export { NotFoundError };
