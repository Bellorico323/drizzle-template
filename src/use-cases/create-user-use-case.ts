import type { User } from "@/db/schema";
import type { UserRepository } from "@/repositories/user-repository";

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
     const user = await this.userRepository.create({name, email, password})

     return { user }
  }
}