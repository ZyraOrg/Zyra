import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignupBg from "../../assets/signup.png";
import Logo from "../../assets/logo4.png";
import { BsApple, BsGoogle, BsTwitterX } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import supabase, { isSupabaseConfigured } from "../../lib/supabaseClient";
import api from "../../services/api";
import { SITE_URL } from "../../config";

export default function ZyraSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    if (!formData.password.trim()) newErrors.password = "Please create a password";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error("Please fill in all required fields correctly");
    return;
  }

  setIsSubmitting(true);
  try {
    const res = await api.post("/api/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    toast.success(res.data.message || "Signup successful");
    navigate("/login");
  } catch (error) {
    const err =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Signup failed";
    toast.error(err);
    setErrors((prev) => ({ ...prev, server: err }));
  } finally {
    setIsSubmitting(false);
  }
};

  const handleGoogleSignup = async () => {
    if (!isSupabaseConfigured || !supabase) {
      toast.error("Google sign up not configured");
      return;
    }
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${SITE_URL}/auth/callback`,
        },
      });
      if (error) throw error;
      // Redirect happens automatically
    } catch (err) {
      console.error("Google OAuth error:", err);
      toast.error(err?.message || "Google sign up failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] bg-background flex justify-center overflow-hidden">
      {/* Left Side - Image */}
      <div
        className="hidden md:flex relative w-full md:w-1/2 h-[100dvh] items-center justify-center"
        data-aos="fade-right"
      >
        <img
          src={SignupBg}
          alt="Signup Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />

        <div className="absolute inset-0 z-40 flex-col justify-between hidden px-12 py-12 text-white md:flex">
          <div className="-mt-8" data-aos="fade-down" data-aos-duration="1000">
            <img src={Logo} alt="ZYRA" />
          </div>
          <div className="flex flex-col justify-center">
            <h1
              className="mb-6 text-5xl font-bold leading-13"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              Create Your <span className="text-secondary">Zyra</span> Account
            </h1>
            <p
              className="max-w-md text-lg font-medium leading-snug"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              Sign up to create campaigns, donate securely, and track every
              transaction on-chain.
            </p>
          </div>
          <div></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative flex flex-col justify-center w-full max-w-md p-8 bg-background rounded-2xl md:max-w-full md:w-1/2">
        {/* Mobile */}
        <div className="mb-8 text-center md:hidden">
          <h1
            className="mb-4 text-3xl font-bold text-white"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="0"
          >
            Create Your <span className="text-secondary">Zyra</span> Account
          </h1>
          <p
            className="text-sm text-gray-400"
            data-aos="fade-down"
            data-aos-duration="800"
            data-aos-delay="0"
          >
            Sign up to create campaigns, donate securely, and track every
            transaction on-chain.
          </p>
        </div>

        <h2
          className="hidden mb-8 text-2xl font-semibold text-white md:block"
          data-aos="fade-down"
          data-aos-duration="1500"
          data-aos-delay="0"
        >
          Sign up now
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              data-aos="slide-left"
              data-aos-duration="700"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-3 text-white placeholder-gray-500 transition bg-transparent border-b border-gray-600 focus:outline-none focus:border-secondary"
            />
          </div>
          <div>
            <input
              data-aos="slide-left"
              data-aos-duration="800"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 text-white placeholder-gray-500 transition border-b border-gray-600 bg-background focus:outline-none focus:border-secondary"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                data-aos="slide-left"
                data-aos-duration="900"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 pr-10 text-white placeholder-gray-500 transition border-b border-gray-600 bg-background focus:outline-none focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 text-gray-400 -translate-y-1/2 top-1/2 hover:text-white"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                data-aos="slide-left"
                data-aos-duration="1000"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 pr-10 text-white placeholder-gray-500 transition bg-transparent border-b border-gray-600 focus:outline-none focus:border-secondary"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-0 text-gray-400 -translate-y-1/2 top-1/2 hover:text-white"
              >
                {showConfirmPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-[1.2rem] font-bold py-3 rounded-[10px] 
             hover:opacity-90 hover:shadow-[0_0_20px_rgba(145,242,249,0.5)] transition-all mt-4 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div
              className="flex-1 h-px bg-gray-700"
              data-aos="fade-up" data-aos-delay="400"
            ></div>
            <span data-aos="fade-up" data-aos-delay="400">
              or sign up with
            </span>
            <div
              className="flex-1 h-px bg-gray-700"
              data-aos="fade-up" data-aos-delay="400"
            ></div>
          </div>

          <div
            className="flex items-center justify-center gap-2 mt-5"          
          >
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center bg-white w-9 h-9 rounded-xl disabled:opacity-60 cursor-pointer"
              disabled={isSubmitting}
            >
              <BsGoogle className="w-5 h-5 text-black" />
            </button>
            <button
              className="flex items-center justify-center bg-white w-9 h-9 rounded-xl cursor-pointer"             
            >
              <BsTwitterX className="w-5 h-5 text-black" />
            </button>
            <button
              className="flex items-center justify-center bg-white w-9 h-9 rounded-xl cursor-pointer"            
            >
              <BsApple className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-secondary hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
