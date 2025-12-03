import { writable, derived, get } from 'svelte/store';
import { browser, building, dev, version } from '$app/environment';
import { initializeCart } from '$lib/stores/cart.js';

const readStorage = () => {
  if (!browser) return [];

  let str = localStorage.getItem('user');
  if(str !== null) {
    return JSON.parse(str);
  } else {
    return null;
  }
};

const writeStorage = () => {
  if (!browser) return;

  localStorage.setItem('user', JSON.stringify(get(loginUser)));
};


export const loginUser = writable(readStorage());

export const login = async (user) => {
  loginUser.set(user);
  writeStorage();

  initializeCart();
};

export const logout = async () => {
  loginUser.set(null);

  if (browser) {
    localStorage.removeItem('user')
  }
};
