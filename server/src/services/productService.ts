import ProductModel from "../models/Product.js";
import type { ProductData } from "../types/product.types.js";

export async function getAllProducts(): Promise<any[]> {
    const result = await ProductModel.getAllProducts();
    return result;
}

export async function createProduct(productData: ProductData): Promise<any> {
    const result = await ProductModel.createProduct(productData);
    return result;
}

export async function deleteProduct(slug: string): Promise<boolean> {
    const result = await ProductModel.deleteProduct(slug);
    return result;
}

export async function getProductBySlug(slug: string): Promise<any> {
    const result = await ProductModel.gerProductBySlug(slug);
    return result;
}