import fastify from "fastify";
import cors from "@fastify/cors";
import { db } from "./config/db";
import { itemRoutes } from "./routes/ItemRoutes";

db.on("error", () => console.log("erro de conexão"));
db.once("open", () =>
  console.log("Conexão com banco de dados foi bem-sucedida")
);

export const app = fastify();

app.register(cors);
app.register(itemRoutes);