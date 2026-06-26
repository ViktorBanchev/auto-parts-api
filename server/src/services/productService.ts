import ProductModel from "../models/Product.js";
import type { ProductData } from "../types/product.types.js";

export async function getProducts(
    categoryQuery?: string,
    searchQuery?: string,
    pageStr?: string,
    limitStr?: string
) {
    const page = parseInt(pageStr || '1', 10);
    const limit = parseInt(limitStr || '12', 10)

    const offset = (page - 1) * limit;

    const categorySlugs = categoryQuery ? categoryQuery.split(',') : undefined;

    const rows = await ProductModel.getProducts({
        categorySlugs,
        searchQuery,
        limit,
        offset
    });

    const totalCount = rows.length > 0 ? parseInt(rows[0].total_count, 10) : 0;
    const totalPages = Math.ceil(totalCount / limit);

    const cleanData = rows.map(row => {
        const {total_count, ...productDetails} = row;
        return productDetails;
    });

    return {
        data: cleanData,
        pagination: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit
        }
    }
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
    const result = await ProductModel.getProductBySlug(slug);
    return result;
}