/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://auth-using-cookies-express-react-uyve.vercel.app";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const apiCall = async (apiUri: string, body: any, method: HTTPMethod): Promise<any> => {
    const res = await fetch(apiUri, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        return {
            error: `API call failed: ${res.statusText}`,
            success: false
        }
    }

    return res.json();
};

export const apis = {
    signup(email: string, password: string): Promise<any> {
        return apiCall(`${BASE_URL}/signup`, { email, password }, 'POST');
    },
    signin(email: string, password: string): Promise<any> {
        return apiCall(`${BASE_URL}/signin`, { email, password }, "POST");
    },
    logout(): Promise<any> {
        return apiCall(`${BASE_URL}/logout`, {}, "POST");
    },
    getUserDetails(): Promise<any> {
        return apiCall(`${BASE_URL}/user`, {}, "GET");
    },
};
