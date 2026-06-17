import { Router, type Request, type Response } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductBySlug } from "../services/productService.js";

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

productController.delete('/:slug', async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;
        const isDeleted = await deleteProduct(slug);

        if (!isDeleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error during delete" });
    }
});

productController.get('/:slug', async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;
        const product = await getProductBySlug(slug);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
});

export default productController;