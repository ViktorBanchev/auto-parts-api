import pool from "../db.js";
import type { ProductData } from "../types/product.types.js";

class ProductModel {
    static async getAllProducts(): Promise<any[]> {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }

    static async createProduct(productData: ProductData): Promise<any> {
        const { title, slug, description, price, image_url, category_id, brand_id } = productData;
        const query = (`
            INSERT INTO products (title, slug, description, price, image_url, category_id, brand_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `);

        const values = [title, slug, description, price, image_url, category_id, brand_id];
        const result = await pool.query(query, values)
        return result.rows[0];
    }

    static async deleteProduct(productId: string): Promise<boolean> {
        const query = 'DELETE FROM products WHERE id = $1';
        const result = await pool.query(query, [productId]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default ProductModel;