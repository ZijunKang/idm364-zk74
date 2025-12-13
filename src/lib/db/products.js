import supabase from '$lib/db/supabase.js'

const list = async () => {
  const { data, error } =  await supabase.from('products').select('*');

  if (error) {
    console.error('Query products error: ', error)
    return []
  } else {
    return data
  }
}

const insert = async (product) => {
  return await supabase.from('products').insert(product);
}

const update = async (product) => {
  return await supabase.from('products').update(product).eq('id', product.id)
}

const remove = async (id) => {
  return await supabase.from('products').delete().eq('id', id);
}

export default {
  list,
  insert,
  update,
  remove,
}
