import { ItemService } from "../services/ItemService";
import { ItemModel } from "../model/ItemModel";
import { FastifyReply, FastifyRequest } from "fastify";

const itemService = new ItemService();

export async function getAllItems(
  req: FastifyRequest,
  res: FastifyReply
): Promise<ItemModel[]> {
  req.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }
  try {
    const items = await itemService.getAllItems();
    return res.status(200).send(items);
  } catch (err: any) {
    return res.status(500).send({ message: "Cannot load content", error: err.message });
  }
}

export async function addItem(
  req: FastifyRequest<{ Body: ItemModel }>,
  res: FastifyReply
): Promise<void> {
  const item = req.body;
  if (!item) return res.status(404).send();
  try {
    const newItem = await itemService.addItem(item);
    return res.status(201).send(newItem);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
}
export async function toggleItemCompleted(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  if (!id) return res.status(404).send();
  try {
    const editedItem = await itemService.editItem(id);
    return res.status(200).send({ message: "Item updated", editedItem });
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteItem(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  if (!id) res.status(404).send({ message: "Item not found." });
  try {
    await itemService.deleteItem(id);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
}

export async function deleteAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const result = await itemService.deleteAll();
    return res.status(204).send({ message: "Tudo limpo por aqui", result });
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
}
