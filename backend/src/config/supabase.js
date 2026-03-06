const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Per-request auth client — anon key, backed by express-session for PKCE storage
const createAuthClient = (req) => {
  const sessionStorage = {
    getItem: (key) => req.session?.[`sb_${key}`] ?? null,
    setItem: (key, value) => {
      if (req.session) req.session[`sb_${key}`] = value;
    },
    removeItem: (key) => {
      if (req.session) delete req.session[`sb_${key}`];
    },
  };

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    auth: {
      storage: sessionStorage,
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
};

module.exports = { supabase, createAuthClient };
