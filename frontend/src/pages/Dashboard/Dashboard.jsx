import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data } = await supabase?.auth?.getSession();
        const userEmail = data?.session?.user?.email || "";
        if (active) setEmail(userEmail);
      } catch (e) {
        // ignore
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase?.auth?.signOut();
    } catch {}
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-[80vh] text-white flex items-center justify-center">
      <div className="max-w-xl w-full p-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-300 mb-6">
          {email ? `Signed in as ${email}` : `Welcome back!`}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="px-4 py-2 rounded-md bg-white text-black font-semibold"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
