import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService";

export class CreateUserFactory {
  static create() {
    const prisma = new PrismaClient();
    const userRepository = new PrismaUserRepository(prisma);
    const createUserService = new CreateUserService(userRepository);
    const createUserController = new CreateUserController(createUserService);

    return createUserController;
  }
}
