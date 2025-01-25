import express, { Router } from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { validate } from "./shared/middlewares/validate";
import { createUserSchema } from "./modules/users/dtos/create-user.dto";
import { CreateUserFactory } from "./modules/users/features/create/CreateUserFactory";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { NotFoundError } from "./shared/errors/httpErrors/NotFoundError";
const app = express();
const router = Router();

app.use(cors());
app.use(helmet());
app.use(express.json());

const createUserController = CreateUserFactory.create();
router.post("/users", validate(createUserSchema), async (req, res) => {
  await createUserController.handle(req, res);
});

app.use(router);
app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
