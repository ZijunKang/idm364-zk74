import { json, error } from '@sveltejs/kit'
import users from '$lib/db/users.js'


export async function POST({ request }) {
  const { username, password } = await request.json();
  const array = await users.list(username, password)
  return json(array);
}
