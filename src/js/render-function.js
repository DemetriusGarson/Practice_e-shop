import { refs } from './refs';
import { isInCart, isInWishList } from './storage';

export function renderCategories(categories) {
  const allCategories = ['All', ...categories];

  const markup = allCategories
    .map(category => {
      return `<li class="categories__item">
        <button class="categories__btn" type="button">${category}</button>
      </li>`;
    })
    .join('');

  refs.categoriesList.innerHTML = markup;
  const firstCategortButton = document.querySelector('.categories__btn');
  if (firstCategortButton) {
    firstCategortButton.classList.add('categories__btn--active');
  }
}

export function renderProducts(products) {
  const markup = products
    .map(({ id, thumbnail, title, brand, category, price }) => {
      return `<li class="products__item" data-id="${id}">
          <img class="products__image" src="${thumbnail}" alt="${title}" />
          <p class="products__title">${title}</p>
          <p class="products__brand">
            <span class="products__brand--bold">Brand: ${brand}</span>
          </p>
          <p class="products__category">Category: ${category}</p>
          <p class="products__price">Price: ${price}$</p>
        </li>`;
    })

    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function renderProductInModal({
  id,
  thumbnail,
  title,
  brand,
  category,
  price,
  description,
  shippingInformation,
  returnPolicy,
  tags,
}) {
  const tagsMarkup = tags
    ? tags.map(tag => `<li class="modal-product__tag">${tag}</li>`).join('')
    : '';
  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsMarkup}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
  refs.modalProduct.innerHTML = markup;
  updateModalButtons(id);
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

export function updateModalButtons(productId) {
  if (isInCart(productId)) {
    refs.addToCartBtn.textContent = 'Remove from Cart';
  } else {
    refs.addToCartBtn.textContent = 'Add to Cart';
  }

  if (isInWishList(productId)) {
    refs.addToWishListBtn.textContent = 'Remove from WishList';
  } else {
    refs.addToWishListBtn.textContent = 'Add to Wishlist';
  }
}

export function updateCounters(cartItems, wishListItems) {
  refs.cartCount.textContent = cartItems.length;
  refs.wishListCount.textContent = wishListItems.length;
}
