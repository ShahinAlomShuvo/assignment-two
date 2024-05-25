import { PartialTProduct, TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await ProductModel.create(payLoad);
  return result;
};

const getAllProduct = async () => {
  const result = await ProductModel.find();
  return result;
};

const getProductById = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateProduct = async (productId: string, payLoad: PartialTProduct) => {
  const isExist = await ProductModel.findById(productId);

  const result = await ProductModel.findByIdAndUpdate(productId, payLoad, {
    new: true,
  });

  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  if (result) return null;
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
