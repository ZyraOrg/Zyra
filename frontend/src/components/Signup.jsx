import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from "../assets/logo4.png";
import Signup from "../assets/signup.png";
import { FaTwitter, FaApple } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ZyraSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-screen flex bg-[#010415]">
      {/* Left Side - Image */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2"  data-aos="fade-right" data-aos-duration="1000"> 
        <div className="absolute inset-0 z-10 bg-black/60"></div>
        <img 
          src={Signup} 
          alt="Community" 
          className="object-cover w-full h-full"
        />
        <div className="absolute z-20 top-6 left-6">
          <img src={Logo} alt="ZYRA" className="h-10" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-6 text-left">
          <h1 className="mt-2 mb-5 font-semibold text-white text-3x2 md:text-4xl font-roboto" data-aos="fade-up" data-aos-delay="200">
            Create Your <span className="text-cyan-400">Zyra</span> Account
          </h1>
          <p className="max-w-md text-base text-gray-300 md:text-lg" data-aos="fade-up" data-aos-delay="400">
            Sign up to create campaigns, donate securely, and track every transaction on-chain
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col items-center justify-center w-full p-6 lg:w-1/2">
        <div className="flex flex-col justify-center w-full h-full max-w-md overflow-y-auto">
          
          {/* Mobile Top Text */}
          <div className="mb-6 text-center lg:hidden">
            <h1 className="mb-2 text-2xl font-bold text-white">
              Create Your <span className="text-cyan-400">Zyra</span> Account
            </h1>
            <p className="text-sm text-gray-300">
              Sign up to create campaigns, donate securely, and track every transaction on-chain
            </p>
          </div>

          {/* Sign up heading only for desktop */}
          <h2 className="hidden mb-4 text-2xl font-bold text-white md:text-3xl lg:block">Sign up</h2>

          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block mb-1 text-sm text-gray-400">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-2 text-white bg-transparent border-b border-gray-700 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block mb-1 text-sm text-gray-400">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-0 py-2 text-white bg-transparent border-b border-gray-700 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-1 text-sm text-gray-400">Create Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-0 py-2 pr-10 text-white bg-transparent border-b border-gray-700 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-400 -translate-y-1/2 top-1/2 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block mb-1 text-sm text-gray-400">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-0 py-2 pr-10 text-white bg-transparent border-b border-gray-700 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 text-gray-400 -translate-y-1/2 top-1/2 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-[1.2rem] font-bold py-3 rounded-[10px] 
                         hover:opacity-90 hover:shadow-[0_0_20px_rgba(145,242,249,0.5)] transition-all mt-4"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">or sign up with</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-3">
            <button className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full hover:bg-gray-100">
              <SiGoogle className="w-5 h-5 text-black" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full hover:bg-gray-100">
              <FaTwitter className="w-5 h-5 text-black" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full hover:bg-gray-100">
              <FaApple className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-4 text-sm text-center text-gray-400">
            Already a member?{' '}
            <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
