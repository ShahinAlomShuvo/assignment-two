"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProduct = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payLoad);
    return result;
});
const getAllProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        query = {
            $or: [{ name: regex }, { description: regex }, { category: regex }],
        };
    }
    const result = yield product_model_1.default.find(query);
    return result;
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productId);
    if (!result)
        throw new Error("Product not found");
    return result;
});
const updateProduct = (productId, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.default.findById(productId);
    if (!isProductExist)
        throw new Error("Product not found");
    const result = yield product_model_1.default.findByIdAndUpdate(productId, payLoad, {
        new: true,
    });
    return result;
});
const updatedProductQuantity = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productId, { $inc: { "inventory.quantity": -quantity } }, { new: true });
    if (result && result.inventory.quantity === 0) {
        yield product_model_1.default.findByIdAndUpdate(productId, { $set: { "inventory.inStock": false } }, { new: true });
    }
    return result;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(productId);
    if (result)
        return null;
});
exports.ProductService = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    updatedProductQuantity,
};
