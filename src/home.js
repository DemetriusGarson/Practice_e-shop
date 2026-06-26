//Логіка сторінки Home

import {
  handleCategoryClick,
  handleProductListClick,
  initHomePage,
} from './js/handlers';
import { getProductsByCategory } from './js/products-api';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handleCategoryClick);

refs.productsList.addEventListener('click', handleProductListClick);
