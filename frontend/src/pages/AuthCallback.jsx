import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import supabase, { isSupabaseConfigured } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Finishing sign-in...");

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
            toast.success("Signed in with Google");
            navigate("/dashboard", { replace: true });
          }
        } else {
          // Wait briefly for potential auth state change
          const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
            if (sess?.user && !canceled) {
              toast.success("Signed in with Google");
              navigate("/dashboard", { replace: true });
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
      } finally {
        if (!canceled) setStatus("");
      }
    }

    finish();
    return () => {
      canceled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-[60vh] grid place-items-center text-white">
      <div className="text-center">
        <div className="animate-pulse mb-3">🔐</div>
        <p className="text-lg">{status || "You are being redirected..."}</p>
      </div>
    </div>
  );
}
