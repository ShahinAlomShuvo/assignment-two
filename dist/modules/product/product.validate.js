"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialProductValidationSchema = exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .nonnegative({ message: "Quantity must be greater than 0" }),
    inStock: zod_1.z.boolean(),
});
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().gt(0, { message: "Price must be greater than 0" }),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(VariantValidationSchema),
    inventory: InventoryValidationSchema,
});
exports.ProductValidationSchema = ProductValidationSchema;
const PartialProductValidationSchema = ProductValidationSchema.partial();
exports.PartialProductValidationSchema = PartialProductValidationSchema;
