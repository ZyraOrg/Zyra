import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AuthCallback() {
  const navigate = useNavigate();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresIn = params.get("expires_in");

    window.history.replaceState(null, "", window.location.pathname);

    if (!accessToken) {
      toast.error("Authentication failed");
      navigate("/login", { replace: true });
      return;
    }

    fetch(`${API_URL}/api/auth/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken, refreshToken, expiresIn: Number(expiresIn) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session exchange failed");
        toast.success("Signed in successfully");
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        toast.error("Authentication failed");
        navigate("/login", { replace: true });
      });
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
