import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.routes";
import { OrderRoutes } from "./modules/orders/order.routes";
const app = express();

app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running successfully");
});

export default app;
