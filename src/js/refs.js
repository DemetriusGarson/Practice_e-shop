export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),

  notFound: document.querySelector('.not-found'),

  modal: document.querySelector('.modal'),
  modalCloseButton: document.querySelector('.modal__close-btn'),
  modalProduct: document.querySelector('.modal-product'),
  searchForm: document.querySelector('.search-form'),
  searchFormClearButton: document.querySelector('.search-form__btn-clear'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),
  loader: document.querySelector('.loader'),
  addToWishListBtn: document.querySelector('.modal-product__btn--wishlist'),
  cartCount: document.querySelector('[data-cart-count]'),
  wishListCount: document.querySelector('[data-wishlist-count]'),
};
