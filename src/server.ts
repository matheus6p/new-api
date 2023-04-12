import { app } from "./index";

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