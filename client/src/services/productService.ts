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

interface Filters {
    categoryParam: string | undefined;
    searchQuery: string | undefined;
    page: number;
    limit: number;
}

export const getProducts = async (
    categoryParam: string | null,
    searchQuery: string | null,
    page: number = 1,
    limit: number = 12
): Promise<Product[]> => {
    let url = '/products'
    const response = await api.get(url, {
        params: {
            category: categoryParam || undefined,
            search: searchQuery || undefined,
            page: page,
            limit: limit
        }
    });

    return response.data.data;
}

export const getProductBySlug = async (slug: string): Promise<Product> => {
    const response = await api.get(`/products/${slug}`);
    return response.data.data;
}
