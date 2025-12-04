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
  const { error } = await supabase.from('products').insert(product);
  return error
}

const update = async (product) => {
  const { error } =  await supabase.from('products').update(product).eq('id', product.id)
  return error
}

const remove = async (id) => {
  const { error } =  await supabase.from('products').delete().eq('id', id);
  return error
}

export default {
  list,
  insert,
  update,
  remove,
}
