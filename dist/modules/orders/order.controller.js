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
exports.OrderController = void 0;
const order_validate_1 = __importDefault(require("./order.validate"));
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = order_validate_1.default.parse(req.body);
        const result = yield order_service_1.OrderService.createOrder(validateData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors,
            });
        }
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
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const query = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
        const result = yield order_service_1.OrderService.getAllOrder(query);
        let message = "Orders fetched successfully!";
        if (query) {
            message = "Orders fetched successfully for user email!";
        }
        res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
