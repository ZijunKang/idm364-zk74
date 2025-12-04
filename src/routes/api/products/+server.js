import { json, error } from '@sveltejs/kit'
import products from '$lib/db/products.js'


// GET http://localhost:5173/api/products
// GET http://localhost:5173/api/products?id=1
export async function GET({ params, request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  let rows = await products.list()
  if (id) {
    rows = rows.filter(product => product.id === Number(id));
  }

  return json(rows);
}

export async function POST({ request }) {
  const newProduct = await request.json();
  const error = await products.insert(newProduct);

  return json(error);
}

export async function PUT({ request }) {
  const updateProduct = await request.json();
  const error = await products.update(updateProduct);

  return json(error);
}

export async function DELETE({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const error = await products.remove(Number(id));
  return json({ error });
}
