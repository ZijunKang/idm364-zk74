import { json, error } from '@sveltejs/kit'
import supabase from '$lib/db/supabase.js'


// GET http://localhost:5173/api/products
// GET http://localhost:5173/api/products?id=1
export async function GET({ params, request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  let products = await supabase.queryProduct()
  if (id) {
    products = products.filter(product => product.id === Number(id));
  }

  return json(products);
}

export async function POST({ request }) {
  const newProduct = await request.json();
  const error = await supabase.insertProduct(newProduct);

  return json({ error });
}

export async function PUT({ request }) {
  const updateProduct = await request.json();
  const error = await supabase.updateProduct(updateProduct);

  return json({ error });
}

export async function DELETE({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const error = await supabase.deleteProduct(Number(id));
  return json({ error });
}
