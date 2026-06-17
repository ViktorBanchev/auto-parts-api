import api from './api';

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category_id: string;
    brand_id: string;
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
}

export const getProductBySlug = async (slug: string): Promise<Product> => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
}