import { Router, type Request, type Response } from "express";
import { getCategories } from "../services/categoryService.js";

const categoryController = Router();

categoryController.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default categoryController;