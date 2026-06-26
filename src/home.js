//Логіка сторінки Home

import {
  handleAddToCartClick,
  handleCategoryClick,
  handleProductListClick,
  handleSearchClear,
  handleSearchFormSubmit,
  initHomePage,
} from './js/handlers';
import { getProductsByCategory } from './js/products-api';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handleCategoryClick);

refs.productsList.addEventListener('click', handleProductListClick);

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);

refs.searchFormClearButton.addEventListener('click', handleSearchClear);

refs.AddToCartBtn.addEventListener('click', handleAddToCartClick);
