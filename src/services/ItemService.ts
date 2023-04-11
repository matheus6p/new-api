import { ItemModel, Item } from "../model/ItemModel";

export class ItemService {
  async getAllItems(): Promise<ItemModel[]> {
    const items = await Item.find();
    return items;
  }

  async addItem(item: ItemModel): Promise<ItemModel> {
    const newItem = new Item(item);
    await newItem.save();
    return newItem;
  }

  async editItem(id: string): Promise<ItemModel> {
    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    item.isCompleted = !item.isCompleted;
    const editedItem = await item.save();
    return editedItem;
  }

  async deleteItem(id: string): Promise<ItemModel> {
    const itemExists = await Item.findById(id);
    if (!itemExists) throw new Error("Item not found");
    const deleteItem = await itemExists.deleteOne();
    return deleteItem;
  }

  async deleteAll(): Promise<void> {
    await Item.deleteMany({});
  }
}
