/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { apis } from "../services/apis"; // update path if needed
import toast, { Toaster } from "react-hot-toast";

export const Dashboard = () => {
  const [recoilUserData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const data = await apis.getUserDetails();

        if (data.success && data.user) {
          setUserData(data.user);
        } else {
          setError(data.msg || "Failed to fetch user data");
        }
      } catch (e) {
        console.log(e);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await apis.logout();
      if (res.success) {
        setUserData(null);
        location.href = "/";
      } else {
        toast.error("Logout failed: " + (res.msg || "Unknown error"));
      }
    } catch (e) {
      console.log(e);
      toast.error("Logout error");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-black bg-white">
        <div className="flex items-center space-x-3">
          <svg
            className="animate-spin h-6 w-6 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
            ></path>
          </svg>
          <span>Loading user data...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-white">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start py-24 px-8 font-sans">
      <h1 className="text-5xl font-extrabold mb-12 tracking-tight text-black">Dashboard</h1>

      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-8 space-y-8 shadow-md transition-shadow duration-300">
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">Email</h2>
          <p className="text-base font-mono text-gray-600 break-words">
            {recoilUserData?.email || "N/A"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black mb-2">Username</h2>
          <p className="text-base font-mono text-gray-600 break-words">
            {recoilUserData?.username || "N/A"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black mb-2">User ID</h2>
          <p className="text-base font-mono text-gray-600 break-words">
            {recoilUserData?._id || "N/A"}
          </p>
        </div>

        {/* Security Note: Displaying a hashed password is not recommended as it can expose metadata or encourage attacks. Consider removing this field. */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">
            Password{" "}
            <span className="text-sm font-normal text-gray-600">
              (Hashed - i challenge you to decode)
            </span>
          </h2>
          <p className="text-base font-mono text-gray-600 break-words">
            {recoilUserData?.password || "N/A"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className="mt-12 px-8 py-3 bg-white text-black font-medium rounded-full border border-black hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {logoutLoading ? "Logging out..." : "Logout"}
      </button>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#000000",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          error: {
            iconTheme: {
              primary: "#000000",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};