import { PartialTProduct, TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await ProductModel.create(payLoad);
  return result;
};

const getAllProduct = async (searchTerm?: string) => {
  let query = {};
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query = {
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    };
  }
  const result = await ProductModel.find(query);
  return result;
};

const getProductById = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateProduct = async (productId: string, payLoad: PartialTProduct) => {
  const result = await ProductModel.findByIdAndUpdate(productId, payLoad, {
    new: true,
  });

  return result;
};

const updatedProductQuantity = async (productId: string, quantity: number) => {
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    { $inc: { "inventory.quantity": -quantity } },
    { new: true }
  );

  if (result && result.inventory.quantity === 0) {
    await ProductModel.findByIdAndUpdate(
      productId,
      { $set: { "inventory.inStock": false } },
      { new: true }
    );
  }

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
  updatedProductQuantity,
};
