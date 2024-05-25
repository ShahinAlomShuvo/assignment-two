"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
}
exports.default = notFoundHandler;
