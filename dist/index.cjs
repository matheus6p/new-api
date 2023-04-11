"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_fastify = __toESM(require("fastify"), 1);
var import_cors = __toESM(require("@fastify/cors"), 1);

// src/config/db.ts
var import_mongoose = __toESM(require("mongoose"), 1);
var import_config = require("dotenv/config");
var MONGO_URI = process.env.MONGO_URL_CONNECTION || "";
import_mongoose.default.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = import_mongoose.default.connection;

// src/model/ItemModel.ts
var import_mongoose2 = require("mongoose");
var ItemSchema = new import_mongoose2.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true }
  },
  {
    versionKey: false
  }
);
var Item = (0, import_mongoose2.model)("Item", ItemSchema);

// src/services/ItemService.ts
var ItemService = class {
  async getAllItems() {
    const items = await Item.find();
    return items;
  }
  async addItem(item) {
    const newItem = new Item(item);
    await newItem.save();
    return newItem;
  }
  async editItem(id) {
    const item = await Item.findById(id);
    if (!item)
      throw new Error("Item not found");
    item.isCompleted = !item.isCompleted;
    const editedItem = await item.save();
    return editedItem;
  }
  async deleteItem(id) {
    const itemExists = await Item.findById(id);
    if (!itemExists)
      throw new Error("Item not found");
    const deleteItem2 = await itemExists.deleteOne();
    return deleteItem2;
  }
  async deleteAll() {
    await Item.deleteMany({});
  }
};

// src/controller/ItemController.ts
var itemService = new ItemService();
async function getAllItems(req, res) {
  try {
    const items = await itemService.getAllItems();
    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send({ message: "Cannot load content", error: err.message });
  }
}
async function addItem(req, res) {
  const item = req.body;
  if (!item)
    return res.status(404).send();
  try {
    const newItem = await itemService.addItem(item);
    return res.status(201).send(newItem);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
async function toggleItemCompleted(req, res) {
  const { id } = req.params;
  if (!id)
    return res.status(404).send();
  try {
    const editedItem = await itemService.editItem(id);
    return res.status(200).send({ message: "Item updated", editedItem });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
async function deleteItem(req, res) {
  const { id } = req.params;
  if (!id)
    res.status(404).send({ message: "Item not found." });
  try {
    await itemService.deleteItem(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
async function deleteAll(req, res) {
  try {
    const result = await itemService.deleteAll();
    return res.status(204).send({ message: "Tudo limpo por aqui", result });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

// src/routes/ItemRoutes.ts
async function itemRoutes(app) {
  app.get("/items", getAllItems);
  app.post("/addItem", addItem);
  app.put("/items/:id", toggleItemCompleted);
  app.delete("/items/:id", deleteItem);
  app.delete("/deleteAll", deleteAll);
}

// src/index.ts
db.on("error", () => console.log("erro de conex\xE3o"));
db.once(
  "open",
  () => console.log("Conex\xE3o com banco de dados foi bem-sucedida")
);
var server = (0, import_fastify.default)();
server.register(import_cors.default, { origin: true });
server.register(itemRoutes);
server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
