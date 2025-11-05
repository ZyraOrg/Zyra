import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginbgImage from "../../assets/loginbg-image.png";
// import { BsApple, BsGoogle, BsTwitterX } from "react-icons/bs";
import logo4 from "../../assets/logo4.png";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import supabase, { isSupabaseConfigured } from "../../lib/supabaseClient";
import api from "../../services/api";
import { SITE_URL } from "../../config";
import GoogleIcon from "../../assets/googleicon.png";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const onSubmit = async (data) => {};

  const handleGoogleLogin = async () => {};

  return (
    <div className="h-[100dvh] bg-background flex justify-center overflow-hidden items-center">
      <div className="w-full max-w-md md:max-w-full md:grid md:grid-cols-2 md:gap-8">
        <div
          className="hidden md:flex flex-col relative w-full h-[100dvh] items-center justify-center"
          data-aos="fade-right"
        >
          <img
            src={loginbgImage}
            alt="image"
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />

          <div className="absolute inset-0 z-40 flex-col justify-between hidden px-12 py-12 text-white md:flex">
            <div
              className="-mt-8"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <img src={logo4} alt="logo" />
            </div>
            <div className="flex flex-col justify-center">
              <h1
                className="mb-6 text-5xl font-bold leading-13"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                Welcome Back <br />
                to <span className="text-secondary">Zyra</span>
              </h1>
              <p
                className="max-w-md text-lg font-medium leading-snug"
                data-aos="fade-up"
                data-aos-duration="900"
              >
                Login to manage your campaigns, donation and track your impact.
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="relative flex flex-col items-stretch justify-center w-full px-8 bg-background rounded-2xl md:pr-8">
          <div className="mb-8 md:hidden">
            <h1
              className="mt-8 mb-4 text-3xl font-bold text-center text-white"
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay="0"
            >
              Welcome Back to <span className="text-secondary">Zyra</span>
            </h1>
            <p
              className="text-sm text-center text-gray-400"
              data-aos="fade-down"
              data-aos-duration="900"
              data-aos-delay="0"
            >
              Login to manage your campaigns, donation and track your impact.
            </p>
          </div>

          <h2
            className="hidden mb-8 text-2xl font-semibold text-white md:block mt-15"
            data-aos="fade-down"
            data-aos-duration="1500"
            data-aos-delay="0"
          >
            Login now
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                data-aos="slide-left"
                data-aos-duration="700"
                data-aos-delay="0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="w-full py-3 placeholder-gray-500 transition border-b border-gray-600 bg-background focus:outline-none focus:border-secondary"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  data-aos="slide-left"
                  data-aos-duration="800"
                  data-aos-delay="0"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
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
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-[1.2rem] font-bold py-3 rounded-[10px] 
                         hover:opacity-90 hover:shadow-[0_0_20px_rgba(145,242,249,0.5)] transition-all mt-4 ${
                           isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                         }`}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="0"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div
                className="flex-1 h-px bg-gray-700"
                data-aos="fade-up"
                data-aos-delay="300"
              ></div>
              <span data-aos="fade-up" data-aos-delay="300">
                or login in with
              </span>
              <div
                className="flex-1 h-px bg-gray-700"
                data-aos="fade-up"
                data-aos-delay="300"
              ></div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-white text-black py-1 px-4 font-semibold text-sm rounded-xl disabled:opacity-60 gap-2 cursor-pointer shadow-2xl shadow-neutral-200 hover:shadow-[0_0_5px_rgba(145,242,249,0.2)]"
                disabled={isSubmitting}
              >
                <img src={GoogleIcon} alt="google icon" className="w-5 h-5" />
                <span> Continue with google</span>
              </button>

              {/* <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white w-9 h-9 rounded-xl cursor-pointer"
                data-aos="slide-left"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <BsTwitterX size={24} className="text-black" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white w-9 h-9 rounded-xl cursor-pointer"
                data-aos="slide-left"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                <BsApple size={27} className="text-black" />
              </a> */}
            </div>
          </div>

          <div className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-secondary hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
