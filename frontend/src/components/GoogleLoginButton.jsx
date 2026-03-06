import GoogleIcon from "../assets/googleicon.png";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function GoogleLoginButton({ disabled }) {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={disabled}
      className="flex items-center justify-center bg-white text-black py-1 px-4 font-semibold text-sm rounded-xl disabled:opacity-60 gap-2 cursor-pointer shadow-2xl shadow-neutral-200 hover:shadow-[0_0_5px_rgba(145,242,249,0.2)]"
    >
      <img src={GoogleIcon} alt="google icon" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
}
