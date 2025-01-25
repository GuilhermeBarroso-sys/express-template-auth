import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserDTO } from "../../dtos/create-user.dto";
import { IUserRepository, User } from "../../repositories/IUserRepository";
import { sign } from "jsonwebtoken";
interface CreateUserServiceResponse {
  user: User;
  token: string;
}
export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<CreateUserServiceResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email already in use");
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    const { name, email, id } = user;
    const token = sign({ id, name, email }, process.env.JWT_SECRET!, { expiresIn: "30d" });
    return { user, token };
  }
}
