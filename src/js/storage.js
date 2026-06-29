import { STORAGE_KEYS } from './constants';

export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error geting data from local storage', error);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`Error saving to storage`, error);
  }
}

export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) ?? [];
}

export function getWishListItems() {
  return getFromStorage(STORAGE_KEYS.WHISHLIST) ?? [];
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}

export function isInWishList(id) {
  const wishListItems = getWishListItems();
  return wishListItems.includes(id);
}

export function removeFromCart(id) {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.CART, updatedItems);
}

export function removeFromWishList(id) {
  const wishListItems = getWishListItems();
  const updatedItems = wishListItems.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.WHISHLIST, updatedItems);
}

export function addToCart(id) {
  const cartItems = getCartItems();
  if (!cartItems.includes(id)) {
    cartItems.push(id);
    saveToStorage(STORAGE_KEYS.CART, cartItems);
  }
}

export function addToWishList(id) {
  const wishListItems = getWishListItems();
  if (!wishListItems.includes(id)) {
    wishListItems.push(id);
    saveToStorage(STORAGE_KEYS.WHISHLIST, wishListItems);
  }
}
