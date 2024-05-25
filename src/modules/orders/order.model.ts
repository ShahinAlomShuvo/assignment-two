import { Schema, model } from "mongoose";
import { TProductOrder } from "./order.interface";

const productOrderSchema = new Schema<TProductOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const ProductOrderModel = model("ProductOrder", productOrderSchema);

export default ProductOrderModel;
