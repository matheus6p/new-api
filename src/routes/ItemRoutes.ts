import { FastifyInstance } from "fastify";
import { getAllItems, addItem, toggleItemCompleted, deleteItem, deleteAll  } from "../controller/ItemController";
import { ItemModel } from "../model/ItemModel";

export async function itemRoutes(app: FastifyInstance) {
  app.get("/items", getAllItems);
  app.post<{ Body: ItemModel; Reply: { item: ItemModel } }>("/addItem", addItem);
  app.put<{Params: {id: string}; Reply: {message: string; editedItem: ItemModel}}>("/items/:id", toggleItemCompleted);
  app.delete("/items/:id", deleteItem);
  app.delete("/deleteAll", deleteAll);
}
