import { Schema, model, connect } from "mongoose";

export interface ItemModel {
  _id?: string;
  name: string;
  isCompleted: boolean;
}

const ItemSchema = new Schema<ItemModel>({
  _id: { type: String },
  name: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
},
{
  versionKey: false,
}
);

export const Item = model<ItemModel>("Item", ItemSchema);
