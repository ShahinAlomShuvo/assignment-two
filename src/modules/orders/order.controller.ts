import { Request, Response } from "express";
import ProductOrderValidateSchema from "./order.validate";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const validateData = ProductOrderValidateSchema.parse(req.body);
    const result = await OrderService.createOrder(validateData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Insufficient quantity available in inventory") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrder();
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
