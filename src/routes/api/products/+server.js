import { json, error } from '@sveltejs/kit'
import mockData from "./mockData.js";


// GET http://localhost:5173/api/products
// GET http://localhost:5173/api/products?id=1
export async function GET({ params, request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  let products = mockData;
  if (id) {
    products = products.filter(product => product.id === Number(id));
  }

  return json(products);
}

export async function POST({ request }) {
  const data = await request.json();
  mockData.push(data)

  return json(mockData);
}

export async function PUT({ request }) {
  const data = await request.json();

  return json(mockData.map(product => product.id === data.id ? data : product));
}

export async function DELETE({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  return json(mockData.filter(product => product.id !== Number(id)));
}

async function fetchFromSupabase() {

}
