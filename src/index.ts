import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { db } from "./config/db";
import { itemRoutes } from "./routes/ItemRoutes";

db.on("error", () => console.log("erro de conexão"));
db.once("open", () =>
  console.log("Conexão com banco de dados foi bem-sucedida")
);

const server = fastify();
server.register(fastifyCors, {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
});
server.register(itemRoutes);

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
