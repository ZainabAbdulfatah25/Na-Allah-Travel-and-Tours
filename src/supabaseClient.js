const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use global supabase from CDN
export const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
