import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export function getCategories() {
  return axios.get(API_ENDPOINTS.CATEGORIES).then(({ data }) => {
    return data;
  });
}

export function getProducts() {
  return axios.get(API_ENDPOINTS.PRODUCTS).then(({ data }) => {
    return data;
  });
}
