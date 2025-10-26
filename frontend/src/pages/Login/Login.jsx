import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginbgImage from "../../assets/loginbg-image.png";
import { BsApple, BsGoogle, BsTwitterX } from "react-icons/bs";
import logo4 from "../../assets/logo4.png";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data gotten");
    //API
    toast.success("Login pending");
  };

  return (
    <div className="h-[100dvh] bg-background flex justify-center overflow-hidden">
      <div className="w-full max-w-md md:max-w-full md:grid md:grid-cols-2 md:gap-8">
        <div className="hidden md:flex flex-col relative w-full h-[100dvh] items-center justify-center">
          <img
            src={loginbgImage}
            alt="image"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />

          <div className="absolute inset-0 z-40 hidden md:flex flex-col justify-between text-white py-12 px-12">
            <div className="-mt-8">
              <img src={logo4} alt="logo" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold mb-6 leading-13">
                Welcome Back <br />
                to <span className="text-secondary">Zyra</span>
              </h1>
              <p className="text-lg max-w-md leading-snug font-medium">
                Login to manage your campaigns, donation and track your impact.
              </p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="bg-background rounded-2xl p-8 relative flex flex-col justify-center">
          <div className="md:hidden mb-8">
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 text-center">
              Welcome Back to <span className="text-secondary">Zyra</span>
            </h1>
            <p className="text-gray-400 text-sm text-center">
              Login to manage your campaigns, donation and track your impact.
            </p>
          </div>

          <h2 className="hidden md:block text-2xl font-semibold text-white mb-8 mt-15">
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
                className="w-full bg-background border-b border-gray-600 placeholder-gray-500 py-3 focus:outline-none focus:border-secondary transition"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter Password"
                className="w-full bg-backround border-b border-gray-600 text-white placeholder-gray-500 py-3 focus:outline-none focus:border-secondary transition"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-gradient-to-r from-primary via-secondary to-secondary text-black font-bold py-4 rounded-xl hover:opacity-90 transition mt-8 text-lg cursor-pointer shadow-md shadow-primary"
            >
              Login
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span>or login in with</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>
            <div className="mt-5 flex justify-center items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-9 h-9 flex items-center justify-center rounded-xl"
              >
                <BsGoogle size={24} className="text-black" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-9 h-9 flex items-center justify-center rounded-xl"
              >
                <BsTwitterX size={24} className="text-black" />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-9 h-9 flex items-center justify-center rounded-xl"
              >
                <BsApple size={27} className="text-black" />
              </a>
            </div>
          </div>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-secondary hover:scale-105 cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
