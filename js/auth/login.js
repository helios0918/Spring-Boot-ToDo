import { BASE_URL } from "../config.js";

export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}
