import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import supabase, { isSupabaseConfigured } from "../lib/supabaseClient";
import api from "../services/api";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let canceled = false;

    async function finish() {
      if (!isSupabaseConfigured || !supabase) {
        toast.error("Auth is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Ensure the URL hash is consumed by Supabase and session is available
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const session = data?.session;
        if (session?.user) {
          if (!canceled) {
            try {
              await api.exchangeSupabaseSession({
                accessToken: session.access_token,
                expiresIn: session.expires_in,
              });
            } catch (e) {
              console.error("Session exchange failed:", e);
              // If exchange fails, the dashboard will redirect to login anyway.
            }
            toast.success("Signed in with Google");
            navigate("/dashboard", { replace: true });
          }
        } else {
          // Wait briefly for potential auth state change
          const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
            if (sess?.user && !canceled) {
              (async () => {
                try {
                  await api.exchangeSupabaseSession({
                    accessToken: sess.access_token,
                    expiresIn: sess.expires_in,
                  });
                } catch (e) {
                  console.error("Session exchange failed:", e);
                }
                toast.success("Signed in with Google");
                navigate("/dashboard", { replace: true });
              })();
            }
          });
          setTimeout(() => {
            listener?.subscription?.unsubscribe();
            if (!canceled) {
              toast.error("Could not complete sign-in");
              navigate("/login", { replace: true });
            }
          }, 2000);
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        toast.error(err?.message || "Authentication failed");
        navigate("/login", { replace: true });
      }
    }

    finish();
    return () => {
      canceled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-[60vh] grid place-items-center text-white">
      <div
        className="h-10 w-10 rounded-full border-4 border-white/20 border-t-white animate-spin"
        aria-label="Signing you in"
        role="status"
      />
    </div>
  );
}
