import { ProductService } from "../product/product.service";
import { TProductOrder } from "./order.interface";
import ProductOrderModel from "./order.model";

const createOrder = async (payLoad: TProductOrder) => {
  const isProductExist = await ProductService.getProductById(payLoad.productId);
  if (!isProductExist) throw new Error("Product not found");

  if (
    !isProductExist.inventory.quantity ||
    isProductExist.inventory.quantity < payLoad.quantity
  ) {
    throw new Error("Insufficient quantity available in inventory");
  }
  const result = await ProductOrderModel.create(payLoad);
  const updatedProduct = await ProductService.updatedProductQuantity(
    payLoad.productId,
    payLoad.quantity
  );
  return result;
};

const getAllOrder = async (query?: string) => {
  let filter = {};
  if (query) {
    filter = {
      email: query,
    };
  }
  const result = await ProductOrderModel.find(filter);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
