import { json, error } from '@sveltejs/kit'
import carts from '$lib/db/carts.js'


export async function GET({ params, request }) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  let items = await carts.query(username)
  return json(items);
}

export async function PUT({ request }) {
  const { username, items } = await request.json();
  const error = await carts.update(username, items);
  return json(error);
}
