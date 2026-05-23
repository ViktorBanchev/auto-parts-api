import pool from "../db.js";

class ProductModel {
    static async getAllProducts(): Promise<any[]> {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }
}

export default ProductModel;