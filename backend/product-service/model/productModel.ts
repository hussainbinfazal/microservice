import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  readonly _id: string;
  name: string;
  size: string;
  price: string;
  createdAt: Date;
}
const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  size: { type: String, required: true },
  price: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
export { IProduct };
