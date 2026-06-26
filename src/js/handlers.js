import { toggleActiveClass } from './helpers';
import { getCategories, getProducts } from './products-api';
import { refs } from './refs';
import { renderCategories, renderProducts } from './render-function';

export function initHomePage() {
  getCategories()
    .then(data => {
      renderCategories(data);
    })
    .catch(error => {
      console.log('помилка запиту сторiнки home', error);
    });

  getProducts()
    .then(({ products }) => {
      console.log(products);
      renderProducts(products);
    })
    .catch(error => {
      console.log('помилка рендеру продуктiв');
    });
}

export function handleCategoryClick(event) {
  const categoryButton = event.target.closest('.categories__btn');
  console.log(categoryButton);
  if (!categoryButton) {
    return;
  }
  const allCategoryButtons =
    refs.categoriesList.querySelectorAll('.categories__btn');

  toggleActiveClass(
    allCategoryButtons,
    categoryButton,
    'categories__btn--active'
  );
}
