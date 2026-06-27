import pool from '../db.js';

const initSql = `
    CREATE TABLE categories
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,
    name        VARCHAR(40) NOT NULL,
    slug        VARCHAR(40) NOT NULL
        UNIQUE,
    description TEXT
);

CREATE TABLE brands
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    slug        VARCHAR(50) NOT NULL
        UNIQUE,
    description TEXT
);

CREATE TABLE products
(
    id             UUID                     DEFAULT gen_random_uuid() NOT NULL
        PRIMARY KEY,
    title          VARCHAR(255)                                       NOT NULL,
    slug           VARCHAR(255)                                       NOT NULL
        UNIQUE,
    description    TEXT,
    price          NUMERIC(10, 2)                                     NOT NULL,
    stock_quantity INTEGER                  DEFAULT 0,
    image_url      TEXT,
    category_id    INTEGER,
    brand_id       INTEGER,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE users
(
    id            UUID      DEFAULT gen_random_uuid() NOT NULL
        PRIMARY KEY,
    email         VARCHAR(255)                        NOT NULL
        UNIQUE,
    password_hash VARCHAR(255)                        NOT NULL,
    first_name    VARCHAR(100),
    last_name     VARCHAR(100),
    created_at    TIMESTAMP DEFAULT current_timestamp
);

`;

async function run() {
    try {
        await pool.query(initSql);
        console.log("Таблиците са създадени успешно!");
    } catch (err) {
        console.error("Грешка при създаване:", err);
    } finally {
        process.exit();
    }
}
run();