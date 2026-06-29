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
  hideLoader,
  hideNotFound,
  renderCategories,
  renderProductInModal,
  renderProducts,
  showLoader,
  showNotFound,
  updateCounters,
} from './render-function';
import {
  addToCart,
  addToWishList,
  getCartItems,
  getWishListItems,
  isInCart,
  isInWishList,
  removeFromCart,
  removeFromWishList,
} from './storage';

let currentProductId = null;

// export function initHomePage() {
//   getCategories()
//     .then(data => {
//       renderCategories(data);
//     })
//     .catch(error => {
//       console.log('помилка запиту сторiнки home', error);
//     });

//   getProducts()
//     .then(({ products }) => {
//       renderProducts(products);
//     })
//     .catch(error => {
//       console.log('помилка рендеру продуктiв');
//     });
// }

export async function initHomePage() {
  updateCounters(getCartItems(), getWishListItems());
  try {
    showLoader();
    const data = await getCategories();
    renderCategories(data);

    const { products } = await getProducts();
    renderProducts(products);
  } catch (error) {
    console.log('ошибка инициализации страницы home', error);
  } finally {
    hideLoader();
  }
}

// export function handleCategoryClick(event) {
//   const categoryButton = event.target.closest('.categories__btn');
//   console.log(categoryButton);
//   if (!categoryButton) {
//     return;
//   }

//   clearProductsList();

//   const allCategoryButtons =
//     refs.categoriesList.querySelectorAll('.categories__btn');

//   toggleActiveClass(
//     allCategoryButtons,
//     categoryButton,
//     'categories__btn--active'
//   );

//   const categorySlug = categoryButton.textContent.trim();
//   console.log(categorySlug);

//   if (categorySlug === 'All') {
//     getProducts()
//       .then(({ products }) => {
//         console.log(products);
//         hideNotFound();
//         renderProducts(products);
//       })
//       .catch(error => {
//         console.log('помилка рендеру продуктiв');
//       });
//   } else {
//     getProductsByCategory(categorySlug)
//       .then(({ products }) => {
//         if (products.length > 0) {
//           hideNotFound();
//           renderProducts(products);
//         } else {
//           showNotFound();
//         }
//       })
//       .catch(error => {
//         showNotFound();
//         console.log(error);
//       });
//   }
// }

export async function handleCategoryClick(event) {
  const categoryButton = event.target.closest('.categories__btn');

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

  try {
    showLoader();
    if (categorySlug === 'All') {
      const { products } = await getProducts();
      hideNotFound();
      renderProducts(products);
    } else {
      const { products } = await getProductsByCategory(categorySlug);

      if (products.length > 0) {
        hideNotFound();
        renderProducts(products);
      } else {
        showNotFound();
      }
    }
  } catch (error) {
    console.log('помилка рендеру продуктив по категории', error);
    showNotFound();
  } finally {
    hideLoader();
  }
}

// export function handleProductListClick(event) {
//   const productItem = event.target.closest('.products__item');
//   if (!productItem) {
//     return;
//   }
//   const productId = Number(productItem.dataset.id);
//   currentProductId = productId;
//   getProductById(productId)
//     .then(product => {
//       openModal();
//       renderProductInModal(product);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

export async function handleProductListClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) {
    return;
  }
  const productId = Number(productItem.dataset.id);
  currentProductId = productId;
  try {
    const product = await getProductById(productId);
    openModal();
    renderProductInModal(product);
  } catch (error) {
    console.log('помилка отримання одного продукту', error);
  }
}

// export function handleSearchFormSubmit(event) {
//   event.preventDefault();
//   const searchValue = event.target.elements.searchValue.value.trim();
//   console.log(searchValue);
//   if (searchValue === '') {
//     showToast('Please enter search valid query', 'warning');
//     return;
//   }
//   getProductsBySearchValue(searchValue)
//     .then(({ products }) => {
//       clearProductsList();
//       if (products.length > 0) {
//         renderProducts(products);
//         hideNotFound();
//       } else {
//         showNotFound();
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       showNotFound();
//     });
// }

export async function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchValue = event.target.elements.searchValue.value.trim();
  if (searchValue === '') {
    showToast('Please enter search valid query', 'warning');
    return;
  }
  try {
    clearProductsList();
    showLoader();
    const { products } = await getProductsBySearchValue(searchValue);
    clearProductsList();
    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (error) {
    showNotFound();
    console.log('помилка пошуку продуктив', error);
  } finally {
    hideLoader();
  }
}

// export function handleSearchClear() {
//   refs.searchForm.reset();
//   clearProductsList();
//   getProducts()
//     .then(({ products }) => {
//       renderProducts(products);
//       hideNotFound();
//     })
//     .catch(error => {
//       console.log('помилка рендеру продуктiв');
//     });
// }

export async function handleSearchClear() {
  refs.searchForm.reset();
  clearProductsList();
  try {
    showLoader();
    const { products } = await getProducts();
    renderProducts(products);
    hideNotFound();
  } catch (error) {
    console.log('помилка рендеру продуктив', error);
  } finally {
    hideLoader();
  }
}

export function handleAddToCartClick() {
  if (!currentProductId) {
    return;
  }

  try {
    if (isInCart(currentProductId)) {
      removeFromCart(currentProductId);
      refs.addToCartBtn.textContent = 'Add to Cart';
      showToast('Product remove from Cart', 'info');
    } else {
      addToCart(currentProductId);
      refs.addToCartBtn.textContent = 'Remove from Cart';
      showToast('Product added to Cart', 'success');
    }
    updateCounters(getCartItems(), getWishListItems());
  } catch (error) {
    console.error('Error updating cart', error);
  }
}

export function handleAddToWishListClick() {
  if (!currentProductId) {
    return;
  }
  try {
    if (isInWishList(currentProductId)) {
      removeFromWishList(currentProductId);
      refs.addToWishListBtn.textContent = 'Add to Wishlist';
      showToast('Product remove from Wishlist', 'info');
    } else {
      addToWishList(currentProductId);
      refs.addToWishListBtn.textContent = 'Remove from Wishlist';
      showToast('Product added to Wishlist', 'info');
    }
    updateCounters(getCartItems(), getWishListItems());
  } catch (error) {
    console.error('Error updating wishlist', error);
  }
}
