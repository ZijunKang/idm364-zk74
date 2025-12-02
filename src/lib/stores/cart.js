import { writable, derived, get } from 'svelte/store';
import { browser, building, dev, version } from '$app/environment';

const readStorage = () => {
  if (!browser) return [];

  let str = localStorage.getItem('cart');
  if(str !== null) {
    return JSON.parse(str);
  } else {
    return [];
  }
};

const writeStorage = () => {
  if (!browser) return;

  localStorage.setItem('cart', JSON.stringify(get(cartItems)));
};


export const cartItems = writable(readStorage());


export const cartCount = derived(cartItems, $cartItems =>
    $cartItems.reduce((sum, item) => sum + item.quantity, 0)
);

export const addCartItem = async (product) => {
  cartItems.update(items => {
    return [...items, { ...product, quantity: 1 }]
  });

  writeStorage();
};

export const updateCartItem = async (id, quantity) => {
  cartItems.update(items => {
    return items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + quantity }
      }
      return item
    })
  });

  writeStorage();
};

export const removeCartItem = async (id) => {
  cartItems.update(items => {
    return items.filter(item => item.id !== id)
  })

  writeStorage();
};

export const clearCart = async () => {
  cartItems.set([]);

  writeStorage();
};
