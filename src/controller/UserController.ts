import { UserService } from "../services/UserService";
import { UserModel } from "../model/UserModel";

import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

const userService = new UserService();

export async function userRegister(
  req: FastifyRequest<{ Body: UserModel }>,
  res: FastifyReply
): Promise<void> {
  const { _id, name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Name, email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserModel = {
    _id,
    name,
    email,
    password: hashedPassword,
  };

  const userExist = await userService.userAlreadyExist(newUser);

  if (userExist) res.status(409).send("Usuário ja existente");

  await userService.register(newUser);
}
