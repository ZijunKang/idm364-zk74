import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/private';

const supabase = createClient(
  env.SUPABASE_URL, // ready from Vercel environment variables
  env.SUPABASE_ANON_KEY
)

export const queryProduct = async () => {
  const { data, error } =  await supabase.from('products').select('*');

  if (error) {
    console.error('Error: ', error)
    return []
  } else {
    return data
  }
}

export const insertProduct = async (product) => {
  const { data, error } =  await supabase.from('products').insert(product);

  if (error) {
    console.error('Error: ', error)
    return []
  } else {
    return data
  }
}

export const updateProduct = async (product) => {
  const { data, error } =  await supabase.from('products').update(product);

  if (error) {
    console.error('Error: ', error)
    return []
  } else {
    return data
  }
}
