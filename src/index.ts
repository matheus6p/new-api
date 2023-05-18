import fastify from "fastify";
import cors from "@fastify/cors";

import { db } from "./config/db";
import { itemRoutes } from "./routes/ItemRoutes";
import { userRoutes } from "./routes/UserRoutes";
import { authRoute } from "./routes/AuthRoute";

db.on("error", () => console.log("erro de conexão"));
db.once("open", () =>
  console.log("Conexão com banco de dados foi bem-sucedida")
);

export const app = fastify();

app.register(cors);
app.register(itemRoutes);
app.register(userRoutes);
app.register(authRoute)