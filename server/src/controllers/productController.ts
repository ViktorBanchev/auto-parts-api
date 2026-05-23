import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../services/productService.js";

const productController = Router();

productController.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

export default productController;