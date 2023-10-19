import { Product } from '../types';

const query = async <T>(endpoint: string, {
    method = 'GET',
    body = null,
    headers = {},
}: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
} = {}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            ...headers,
        },
    });
    return response.json() as Promise<T>;
};

const findAllProducts = async () =>
    query<{ items: Product[]; }>('/products')
        .then((response) => response.items);

const findProductById = async (id: string) =>
    query<{ item: Product; }>(`/products/${id}`)
        .then((response) => response.item);

const createProduct = async (product: Product) =>
    query<{ item: Product; }>('/products', { method: 'POST', body: JSON.stringify(product) })
        .then((response) => response.item);

const updateProductById = async (id: string, product: Product) =>
    query<{ item: Product; }>(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(product) })
        .then((response) => response.item);

const deleteProductById = async (id: string) =>
    query<{ item: Product; }>(`/products/${id}`, { method: 'DELETE' })
        .then((response) => response.item);

const useApi = () => {
    return {
        findAllProducts,
        findProductById,
        createProduct,
        updateProductById,
        deleteProductById,
        query,
    };
};

export default useApi;