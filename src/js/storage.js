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

export function SaveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`Error saving to storage`, error);
  }
}

export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) ?? [];
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return getCartItems.includes(id);
}

export function removeFromCart(id) {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(item => item !== id);
  SaveToStorage(STORAGE_KEYS.CART, updatedItems);
}
