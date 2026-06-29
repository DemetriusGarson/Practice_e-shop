import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
  return data;
}

// export function getProducts() {
//   return axios.get(API_ENDPOINTS.PRODUCTS).then(({ data }) => {
//     return data;
//   });
// }

export async function getProducts() {
  const { data } = await axios.get(API_ENDPOINTS.PRODUCTS);
  return data;
}

// export function getProductsByCategory(category) {
//   return axios
//     .get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`)
//     .then(({ data }) => {
//       return data;
//     });
// }

export async function getProductsByCategory(category) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`
  );
  return data;
}

// export function getProductById(id) {
//   return axios.get(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`).then(({ data }) => {
//     return data;
//   });
// }

export async function getProductById(id) {
  const { data } = await axios.get(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}

// export function getProductsBySearchValue(searchValue) {
//   return axios
//     .get(`${API_ENDPOINTS.PRODUCTS_BY_SEARCH}?q=${searchValue}`)
//     .then(({ data }) => {
//       return data;
//     });
// }

export async function getProductsBySearchValue(searchValue) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_SEARCH}?q=${searchValue}`
  );

  return data;
}
