import { Request, Response } from "express";
import ProductValidationSchema from "./product.validate";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const validateData = ProductValidationSchema.parse(req.body);
    console.log(validateData);
    const result = await ProductService.createProduct(validateData);
    res.status(200).json({
      status: "success",
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

export const ProductController = {
  createProduct,
};
