import { useState } from "react";
import { apis } from "../services/apis"; // Your api helper
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apis.signin(email, password);
      if (res.success) {
        window.location.href = "/dashboard"; // simple redirect example
      } else {
        setError(res.msg || "Signin failed");
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
        aria-label="Sign in form"
      >
        <h1 className="text-3xl font-semibold text-center tracking-wide text-black">
          Sign In
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
              <p className="text-center"> Wanna create an account ? Click <a className="underline cursor-pointer" onClick={()=>navigateTo('/signup')}>here</a></p>

      </form>
    </div>
  );
};