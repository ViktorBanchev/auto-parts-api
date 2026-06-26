import pool from "../db.js";

class CategoryModel {
    static async getCategories(): Promise<any[]> {
        const result = await pool.query('SELECT * FROM categories');
        return result.rows;
    }
}

export default CategoryModel;