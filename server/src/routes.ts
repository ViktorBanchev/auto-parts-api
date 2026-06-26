import { Router } from "express";
import productController from "./controllers/productController.js";
import userController from "./controllers/userController.js";
import categoryController from "./controllers/categoryController.js";

const routes = Router();

routes.use('/products', productController);
routes.use('/auth', userController);
routes.use('/categories', categoryController);

export default routes;