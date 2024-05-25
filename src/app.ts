import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.routes";
const app = express();

app.use(express.json());

app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running successfully");
});

export default app;
