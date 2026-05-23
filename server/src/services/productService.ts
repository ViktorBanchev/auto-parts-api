import ProductModel from "../models/Product.js";

export async function getAllProducts(): Promise<any[]> {
    const result = await ProductModel.getAllProducts();
    return result;
}