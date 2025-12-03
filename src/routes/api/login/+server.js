import { json, error } from '@sveltejs/kit'
import supabase from '$lib/db/supabase.js'


export async function POST({ request }) {
  const { username, password } = await request.json();
  const array = await supabase.queryLoginUser(username, password)
  return json(array);
}
