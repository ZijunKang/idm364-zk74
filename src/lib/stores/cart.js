import { writable, derived, get } from 'svelte/store';
import { browser, building, dev, version } from '$app/environment';
import { loginUser } from './user.js'

const readStorage = async () => {
  if (!browser) return [];

  let str = localStorage.getItem('user');
  if(!str) return [];

  const { username } = JSON.parse(str);
  const response = await fetch('/api/cart?username=' + username)
  return await response.json()
};

const writeStorage = async () => {
  if (!browser) return;

  const response = await fetch('/api/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: get(loginUser).username,
      items: get(cartItems)
    })
  })
  return await response.json()
};

export const cartItems = writable([]);
export const initializeCart = async () => {
  cartItems.set(await readStorage())
};

// when press F5 or refresh page
initializeCart().then(r => {})

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

  return await writeStorage();
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

  return await writeStorage();
};

export const removeCartItem = async (id) => {
  cartItems.update(items => {
    return items.filter(item => item.id !== id)
  })

  return await writeStorage();
};

export const clearCart = async () => {
  cartItems.set([]);

  return await writeStorage();
};
