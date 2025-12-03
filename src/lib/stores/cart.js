import { writable, derived, get } from 'svelte/store';
import { browser, building, dev, version } from '$app/environment';
import { loginUser } from './user.js'

const readStorage = () => {
  if (!browser) return [];

  if(!loginUser || !get(loginUser)) {
    return []
  }

  const key = get(loginUser).username + '_cart';

  let str = localStorage.getItem(key);
  if(str !== null) {
    return JSON.parse(str);
  } else {
    return [];
  }
};

const writeStorage = () => {
  if (!browser) return;

  const key = get(loginUser).username + '_cart';
  localStorage.setItem(key, JSON.stringify(get(cartItems)));
};


export const cartItems = writable([]);
export const initializeCart = async () => {
  cartItems.set(readStorage())
};

export const cartCount = derived(cartItems, $cartItems =>
    $cartItems.reduce((sum, item) => sum + item.quantity, 0)
);

export const addCartItem = async (newProduct) => {
  cartItems.update(items => {
    const existingItem = items.find(item => item.id === newProduct.id);
    if (existingItem) {
      return items.map(item => {
        if (item.id === newProduct.id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    } else {
      return [...items, { ...newProduct, quantity: 1 }]
    }
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
