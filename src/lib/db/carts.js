import supabase from '$lib/db/supabase.js'

const query = async (username) => {
  const { data, error } =  await supabase.from('carts').select('*').eq('username', username);

  if (error) {
    console.error('Query carts error: ', error)
    return []
  } else {
    if(data.length === 1) {
      return data[0].items
    } else {
      return []
    }
  }
}

const update = async (username, userItems) => {
  const { data } =  await supabase.from('carts').select('*').eq('username', username);

  if(data.length === 0) {
    const { error } = await supabase.from('carts').insert({
      username,
      items: userItems,
    });
    return error;
  } else {
    // update exists row
    const { error } =  await supabase
      .from('carts')
      .update({ items: userItems, })
      .eq('username', username)
    return error;
  }
}

export default {
  query,
  update,
}
