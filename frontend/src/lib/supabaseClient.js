import { createClient } from "@supabase/supabase-js";

// Support both naming schemes used in the project
const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ||
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

// Create a singleton Supabase client. If env is missing, we'll still export a stub that will error on use.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = isSupabaseConfigured
	? createClient(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
				detectSessionInUrl: true,
			},
		})
	: null;

export default supabase;
