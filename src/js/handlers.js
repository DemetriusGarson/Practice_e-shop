import { toggleActiveClass } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
} from './products-api';
import { refs } from './refs';
import {
  clearProductsList,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showNotFound,
} from './render-function';

let currentProductId = null;

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

  clearProductsList();

  const allCategoryButtons =
    refs.categoriesList.querySelectorAll('.categories__btn');

  toggleActiveClass(
    allCategoryButtons,
    categoryButton,
    'categories__btn--active'
  );

  const categorySlug = categoryButton.textContent.trim();
  console.log(categorySlug);

  if (categorySlug === 'All') {
    getProducts()
      .then(({ products }) => {
        console.log(products);
        hideNotFound();
        renderProducts(products);
      })
      .catch(error => {
        console.log('помилка рендеру продуктiв');
      });
  } else {
    getProductsByCategory(categorySlug)
      .then(({ products }) => {
        if (products.length > 0) {
          hideNotFound();
          renderProducts(products);
        } else {
          showNotFound();
        }
      })
      .catch(error => {
        showNotFound();
        console.log(error);
      });
  }
}

export function handleProductListClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) {
    return;
  }
  const productId = Number(productItem.dataset.id);
  currentProductId = productId;
  getProductById(productId)
    .then(product => {
      console.log(product);
      openModal();
      renderProductInModal(product);
    })
    .catch(error => console.log(error));
}
