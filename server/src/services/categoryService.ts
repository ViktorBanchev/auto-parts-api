import CategoryModel from "../models/Category.js";

export async function getCategories(): Promise<any[]> {
    const result = await CategoryModel.getCategories();
    return result; 
}