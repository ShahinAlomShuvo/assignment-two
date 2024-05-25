import { z } from "zod";

const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().gt(0, { message: "Quantity must be greater than 0" }),
  inStock: z.boolean(),
});

const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().gt(0, { message: "Price must be greater than 0" }),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema,
});

const PartialProductValidationSchema = ProductValidationSchema.partial();
export { ProductValidationSchema, PartialProductValidationSchema };
