import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/private';

const supabase = createClient(
  env.SUPABASE_URL, // ready from Vercel environment variables in production mode
  env.SUPABASE_SECRET_KEY
)

const queryProduct = async () => {
  const { data, error } =  await supabase.from('products').select('*');

  if (error) {
    console.error('Query supabase error: ', error)
    return []
  } else {
    return data
  }
}

const insertProduct = async (product) => {
  const { error } = await supabase.from('products').insert(product);
  return error
}

const updateProduct = async (product) => {
  const { error } =  await supabase.from('products').update(product).eq('id', product.id)
  return error
}

const deleteProduct = async (id) => {
  const { error } =  await supabase.from('products').delete().eq('id', id);
  return error
}

const queryLoginUser = async (username, password) => {
  const { data, error } =  await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password);

  if (error) {
    console.error('Query supabase error: ', error)
    return []
  } else {
    return data
  }
}

export default {
  queryProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  queryLoginUser,
}
