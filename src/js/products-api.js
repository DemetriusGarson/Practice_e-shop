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

export function getProductsByCategory(category) {
  return axios
    .get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`)
    .then(({ data }) => {
      return data;
    });
}

export function getProductById(id) {
  return axios.get(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`).then(({ data }) => {
    return data;
  });
}

export function getProductsBySearchValue(searchValue) {
  return axios
    .get(`${API_ENDPOINTS.PRODUCTS_BY_SEARCH}?q=${searchValue}`)
    .then(({ data }) => {
      return data;
    });
}
