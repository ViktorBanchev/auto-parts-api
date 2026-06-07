import { Router, type Request, type Response } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../services/productService.js";

const productController = Router();

productController.get('/', async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
});

productController.post('/', async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const newProduct = await createProduct(productData);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

productController.delete('/:productId', async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId as string;
        const isDeleted = await deleteProduct(productId);

        if (!isDeleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error during delete" });
    }
})

export default productController;