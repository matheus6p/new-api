import fastify from "fastify";
import cors from "@fastify/cors";
import { db } from "./config/db";
import { itemRoutes } from "./routes/ItemRoutes";

db.on("error", () => console.log("erro de conexão"));
db.once("open", () =>
  console.log("Conexão com banco de dados foi bem-sucedida")
);

const server = fastify();
server.register(cors, {
  origin: [
    "http://localhost:3333",
    "https://shop-list-new-api-production.up.railway.app",
  ],
});
server.register(itemRoutes);

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
