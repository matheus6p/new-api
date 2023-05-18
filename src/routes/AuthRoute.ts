import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { User, UserModel } from "../model/UserModel";

export async function authRoute(app: FastifyInstance) {
  app.post(
    "/users/auth",
    async (req: FastifyRequest<{ Body: UserModel }>, res: FastifyReply) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("Usuário não encontrado.");

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) throw new Error("Senha inválida");

      const JWT_SECRET: string = process.env.JWT_SECRET || "";

      const token = jwt.sign(
        { _id: user._id, username: user.name, email: user.email },
        JWT_SECRET
      );

      return { token };
    }
  );
}
