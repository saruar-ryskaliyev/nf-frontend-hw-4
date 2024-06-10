import axios from 'axios';
import { Product } from '../types';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axiosInstance.post<Product>('/products', product);
    return response.data;
};
