import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await ProductModel.create(payLoad);
  return result;
};

export const ProductService = {
  createProduct,
};
