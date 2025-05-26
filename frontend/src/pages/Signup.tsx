import { useState } from "react";
import { apis } from "../services/apis"; // your API helper
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigateTo =useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await apis.signup(email, password);
      if (res.success) {
        window.location.href = "/signin"; // redirect to signin after signup
      } else {
        setError(res.msg || "Signup failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 space-y-6 shadow-lg"
        aria-label="Sign up form"
      >
        <h1 className="text-3xl font-semibold text-center tracking-wide text-black">
          Sign Up
        </h1>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium tracking-wide text-black"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 font-medium tracking-wide text-black"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 font-medium tracking-wide text-black"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-full px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-gray-600 text-sm text-center" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-medium rounded-full py-3 hover:bg-gray-900 disabled:opacity-50 transition-all"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
                      <p className="text-center"> Wanna signin to your account ? Click <a className="underline cursor-pointer" onClick={()=>navigateTo('/signin')}>here</a></p>

      </form>
    </div>
  );
};