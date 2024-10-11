import type { User, UserInput } from "@/db/schema";

export interface UserRepository {
  create(user: UserInput): Promise<User>
}