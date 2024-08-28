import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
export const fetchProductById = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
export const createProduct = (product) => axios.post(`${API_BASE_URL}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);
