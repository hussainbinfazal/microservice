import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  readonly _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
export { IUser };
