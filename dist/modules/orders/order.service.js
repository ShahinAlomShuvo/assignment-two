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
exports.OrderService = void 0;
const product_service_1 = require("../product/product.service");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_service_1.ProductService.getProductById(payLoad.productId);
    if (!isProductExist)
        throw new Error("Product not found");
    if (!isProductExist.inventory.quantity ||
        isProductExist.inventory.quantity < payLoad.quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    const result = yield order_model_1.default.create(payLoad);
    yield product_service_1.ProductService.updatedProductQuantity(payLoad.productId, payLoad.quantity);
    return result;
});
const getAllOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    if (query) {
        filter = {
            email: query,
        };
    }
    const result = yield order_model_1.default.find(filter);
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
};
