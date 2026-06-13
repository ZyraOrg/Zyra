import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../../assets/logo4.png";
import useAdminStore from "../../store/useAdminStore";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await adminLogin(email, password);
      toast.success("Welcome, Admin");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err.message || "Invalid admin credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010415] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Zyra" className="h-12 w-auto" />
        </div>

        {/* Card */}
        <div className="bg-[#010410] border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-secondary border border-secondary/20">
              <ShieldCheck size={12} />
              Admin Portal
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-1">
            Admin <span className="text-secondary">Login</span>
          </h1>
          <p className="text-sm text-gray-400 text-center mb-8">
            Restricted access — authorised personnel only
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                autoComplete="off"
                className="w-full py-3 px-0 placeholder-gray-500 text-white transition border-b border-gray-600 bg-transparent focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full py-3 px-0 pr-10 placeholder-gray-500 text-white transition border-b border-gray-600 bg-transparent focus:outline-none focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Verifying..." : "Sign in to Admin Panel"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Not an admin?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-secondary hover:underline"
          >
            Go to user login
          </button>
        </p>
      </div>
    </div>
  );
}
