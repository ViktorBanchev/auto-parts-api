import { features } from 'node:process';
import pool from '../db.js';
import type { UserData } from '../types/user.types.js';

class UserModel {
    static async getByEmail(email: string) {
        const query = `SELECT
            id, email, password_hash,
            first_name AS "firstName",
            last_name AS "lastName",
            created_at AS "createdAt"
        FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    };

    static async createUser(userData: UserData) {
        const { email, passwordHash, firstName, lastName } = userData;
        const query = `
            INSERT INTO users (email, password_hash, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email,
                first_name AS "firstName",
                last_name AS "lastName",
                created_at AS "createdAt";
        `;
        const result = await pool.query(query, [email, passwordHash, firstName, lastName]);
        return result.rows[0]
    }
}

export default UserModel;