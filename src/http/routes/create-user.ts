import { getDatabaseInstance } from "@/db";
import { users } from "@/db/schema";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const { db } = getDatabaseInstance()

export const createUser: FastifyPluginAsyncZod = async app => {
  app.post('/users', 
    {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    }
  }, async (request, reply) => {
    const { name, email, password }  = request.body

    const result = await db.insert(users).values({name, email, password}).returning()

    reply.status(201).send({ user: result[0] })
  })
}