import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginbgImage from "../../assets/loginbg-image.png";
import { BsApple, BsGoogle, BsTwitterX } from "react-icons/bs";
import logo4 from "../../assets/logo4.png";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    //API
  };

  return (
    <div className="h-[100dvh] bg-background flex justify-center overflow-hidden">
      <div className="w-full max-w-md md:max-w-full md:grid md:grid-cols-2 md:gap-8">
        <div className="hidden md:flex flex-col relative w-full h-[100dvh] items-center justify-center">
          <img
            src={loginbgImage}
            alt="image"
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />

          <div className="absolute inset-0 z-40 flex-col justify-between hidden px-12 py-12 text-white md:flex">
            <div className="-mt-8">
              <img src={logo4} alt="logo" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-5xl font-bold leading-13">
                Welcome Back <br />
                to <span className="text-secondary">Zyra</span>
              </h1>
              <p className="max-w-md text-lg font-medium leading-snug">
                Login to manage your campaigns, donation and track your impact.
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="relative flex flex-col justify-center p-8 bg-background rounded-2xl">
          <div className="mb-8 md:hidden">
            <h1 className="mb-4 text-3xl font-bold text-center text-white">
              Welcome Back to <span className="text-secondary">Zyra</span>
            </h1>
            <p className="text-sm text-center text-gray-400">
              Login to manage your campaigns, donation and track your impact.
            </p>
          </div>

          <h2 className="hidden mb-8 text-2xl font-semibold text-white md:block mt-15">
            Login now
          </h2>

          <div className="space-y-6">
            <div>
              <input
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
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter Password"
                className="w-full py-3 text-white placeholder-gray-500 transition border-b border-gray-600 bg-backround focus:outline-none focus:border-secondary"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

           <button
  type="submit"
  className="w-full bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-[1.2rem] font-bold py-3 rounded-[10px] 
             hover:opacity-90 hover:shadow-[0_0_20px_rgba(145,242,249,0.5)] transition-all mt-4"
>
  Login
</button>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span>or login in with</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-5">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white w-9 h-9 rounded-xl"
              >
                <BsGoogle size={24} className="text-black" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white w-9 h-9 rounded-xl"
              >
                <BsTwitterX size={24} className="text-black" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white w-9 h-9 rounded-xl"
              >
                <BsApple size={27} className="text-black" />
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-secondary hover:scale-105"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
