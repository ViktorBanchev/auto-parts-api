import { Router } from "express";
import productController from "./controllers/productController.js";

const routes = Router();

routes.use('/products', productController);

export default routes;