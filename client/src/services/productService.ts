import { get } from 'react-hook-form';
import api from './api';

export interface Product {
    id: string,
    title: string,
    price: string,
    image_url: string;
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
}