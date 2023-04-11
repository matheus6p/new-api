"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/ItemService.ts
var ItemService_exports = {};
__export(ItemService_exports, {
  ItemService: () => ItemService
});
module.exports = __toCommonJS(ItemService_exports);

// src/model/ItemModel.ts
var import_mongoose = require("mongoose");
var ItemSchema = new import_mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true }
  },
  {
    versionKey: false
  }
);
var Item = (0, import_mongoose.model)("Item", ItemSchema);

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
    const deleteItem = await itemExists.deleteOne();
    return deleteItem;
  }
  async deleteAll() {
    await Item.deleteMany({});
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemService
});
