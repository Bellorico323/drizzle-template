import { users, type User } from "@/db/schema";
import type { UserRepository } from "../user-repository";
import { getDatabaseInstance } from "@/db";

export class DrizzleUserRepository implements UserRepository {
  private db = getDatabaseInstance().db

  async create(user: User): Promise<User> {
    const result = await this.db.insert(users).values(user).returning()

    return result[0]
  }
}