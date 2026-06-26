import iziToast from 'izitoast';
import { showToast, toggleActiveClass } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySearchValue,
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
import { isInCart } from './storage';

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
      openModal();
      renderProductInModal(product);
    })
    .catch(error => {
      console.log(error);
    });
}

export function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements.searchValue.value.trim();
  console.log(searchValue);
  if (searchValue === '') {
    showToast('Please enter search valid query', 'warning');
    return;
  }
  getProductsBySearchValue(searchValue)
    .then(({ products }) => {
      clearProductsList();
      if (products.length > 0) {
        renderProducts(products);
        hideNotFound();
      } else {
        showNotFound();
      }
    })
    .catch(error => {
      console.log(error);
      showNotFound();
    });
}

export function handleSearchClear() {
  refs.searchForm.reset();
  clearProductsList();
  getProducts()
    .then(({ products }) => {
      renderProducts(products);
      hideNotFound();
    })
    .catch(error => {
      console.log('помилка рендеру продуктiв');
    });
}

export function handleAddToCartClick() {
  if (!currentProductId) {
    return;
  }
  if (isInCart(currentProductId)) {
    //закончили здесь в пятницу
  }
}
