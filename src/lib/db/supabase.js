import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/private';

const supabase = createClient(
  env.SUPABASE_URL, // ready from Vercel environment variables in production mode
  env.SUPABASE_SECRET_KEY
)

export default supabase;
