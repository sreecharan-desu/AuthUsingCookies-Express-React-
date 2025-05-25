import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-24 text-black font-sans">
      <h1 className="text-5xl font-extrabold mb-12 tracking-tight select-none">
        Welcome to <span className="underline decoration-black decoration-4">AuthApp</span>
      </h1>

      <p className="max-w-md text-center mb-16 text-lg leading-relaxed text-gray-600 font-light">
        Simple, secure authentication using cookies. Sign in or sign up to get started.
      </p>

      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/signin")}
          className="px-8 py-3 bg-white border border-black rounded-full font-medium text-black transition-all duration-300 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-white border border-black rounded-full font-medium text-black transition-all duration-300 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}