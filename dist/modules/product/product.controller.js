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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_validate_1 = require("./product.validate");
const product_service_1 = require("./product.service");
const zod_1 = require("zod");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = product_validate_1.ProductValidationSchema.parse(req.body);
        const result = yield product_service_1.ProductService.createProduct(validateData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
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
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchTerm = (_a = req.query.searchTerm) === null || _a === void 0 ? void 0 : _a.toString();
        const result = yield product_service_1.ProductService.getAllProduct(searchTerm);
        let message = "Products fetched successfully!";
        if (searchTerm) {
            message = `Products matching search term '${searchTerm}' fetched successfully!`;
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
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getProductById(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const validateData = product_validate_1.PartialProductValidationSchema.parse(req.body);
        const result = yield product_service_1.ProductService.updateProduct(productId, validateData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
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
                message: "Product not found!",
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProduct(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
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
exports.ProductController = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
