import { BASE_URL, getAuthHeaders } from "../config.js";

export async function getTodos() {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "GET",
        headers: getAuthHeaders()
    });

    return await response.json();
}
