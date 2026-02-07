import axios from "axios";

const API_URL = "https://springboot-backend-cp71.onrender.com/api/items";

export const getItems = () => axios.get(API_URL);
export const getItem = (id) => axios.get(`${API_URL}/${id}`);
export const addItem = (item) => axios.post(API_URL, item);
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
