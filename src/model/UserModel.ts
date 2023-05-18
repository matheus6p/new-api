import { Schema, model } from "mongoose";

export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserModel>(
  {
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const User = model<UserModel>("User", UserSchema);
