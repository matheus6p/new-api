import { FastifyInstance } from "fastify";
import { userRegister } from "../controller/UserController"
import { UserModel } from "../model/UserModel";

export async function userRoutes(app: FastifyInstance) {
  app.post("/register", userRegister);
}
