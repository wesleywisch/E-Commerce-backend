import { FastifyInstance } from "fastify";
import { login, signup } from "../controllers/auth";


export async function authRoutes(app: FastifyInstance) {
  app.post('/signup', signup)
  app.post('/login', login)
}