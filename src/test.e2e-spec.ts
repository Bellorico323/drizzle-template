import { users } from './db/schema';
import { eq } from "drizzle-orm";
import type { drizzle} from 'drizzle-orm/postgres-js'
import { getDatabaseInstance } from './db';
import type { UserRepository } from './repositories/user-repository';
import { DrizzleUserRepository } from './repositories/drizzle/drizzle-user-repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';

let db: ReturnType<typeof drizzle>
let userRepository: UserRepository
let sut: CreateUserUseCase

beforeAll(async () => {
  const { db: databaseInstance } = getDatabaseInstance()
  db = databaseInstance

  userRepository = new DrizzleUserRepository()
  sut = new CreateUserUseCase(userRepository)
})

afterAll(async () => {
})

describe('User tests', () => {
  it.skip('should insert a user into the database', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

   await sut.execute(newUser)

    const [insertedUser] = await db.select().from(users).where(eq(users.email, newUser.email)).limit(1);
    
    expect(insertedUser).toBeDefined();
    expect(insertedUser.name).toBe('John Doe');
    expect(insertedUser.email).toBe('john.doe@example.com');
  })
})