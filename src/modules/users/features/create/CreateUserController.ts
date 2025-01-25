import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;
    const user = await this.createUserService.execute({
      email,
      password,
      name,
    });
    return response.status(201).json(user);
  }
}
