import supabase from '$lib/db/supabase.js'

const list = async (username, password) => {
  const { data, error } =  await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password);

  if (error) {
    console.error('Query users error: ', error)
    return []
  } else {
    return data
  }
}

export default {
  list,
}
