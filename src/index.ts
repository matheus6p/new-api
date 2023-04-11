import fastify from "fastify";
import cors from "@fastify/cors";
import express from "@fastify/express";
import { db } from "./config/db";
import { itemRoutes } from "./routes/ItemRoutes";

db.on("error", () => console.log("erro de conexão"));
db.once("open", () =>
  console.log("Conexão com banco de dados foi bem-sucedida")
);

const app = fastify();

app.register(express);
app.use(cors);
// app.register(cors, { origin: true });
app.register(itemRoutes);

app.listen(
  { host: "0.0.0.0", port: process.env.PORT ? Number(process.env.PORT) : 3333 },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  }
);
