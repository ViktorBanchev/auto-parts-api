import pool from "../db.js";
import type { ProductData } from "../types/product.types.js";

interface ProductQueryParams {
    categorySlugs?: string[] | undefined;
    searchQuery?: string | undefined;
    limit: number;
    offset: number;
}

class ProductModel {
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

    static async deleteProduct(slug: string): Promise<boolean> {
        const query = 'DELETE FROM products WHERE slug = $1';
        const result = await pool.query(query, [slug]);
        return (result.rowCount ?? 0) > 0;
    }

    static async getProductBySlug(slug: string): Promise<any> {
        const query = 'SELECT * FROM products WHERE slug = $1';
        const result = await pool.query(query, [slug]);
        return result.rows[0];
    }

    static async getProducts(params: ProductQueryParams) {
        const { categorySlugs, searchQuery, limit, offset } = params;

        const values: any[] = [];
        let paramIndex = 1;

        let query = `
            SELECT p.*, COUNT(*) OVER() as total_count 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
        `

        if (categorySlugs && categorySlugs.length > 0) {
            query += ` AND c.slug = ANY($${paramIndex}::text[])`;
            values.push(categorySlugs);
            paramIndex++;
        }

        if (searchQuery) {
            query += ` AND (p.title ILIKE $${paramIndex})`;
            values.push(`%${searchQuery}%`);
            paramIndex++;
        }

        query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        values.push(limit, offset);

        const result = await pool.query(query, values);
        return result.rows;

    }
}

export default ProductModel;