import { BASE_URL } from "../config.js";

export async function registerUser(name, email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    return await response.json();
}
