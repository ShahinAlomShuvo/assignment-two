import { object, string, number, boolean, array } from "zod";

const VariantSchema = object({
  type: string(),
  value: string(),
});

const InventorySchema = object({
  quantity: number().min(0, {
    message: "Quantity must be greater than or equal to 0",
  }),
  inStock: boolean(),
});

const ProductSchema = object({
  name: string(),
  description: string(),
  price: number().min(0, {
    message: "Price must be greater than or equal to 0",
  }),
  category: string(),
  tags: array(string()),
  variants: array(VariantSchema),
  inventory: InventorySchema,
});

export default ProductSchema;
