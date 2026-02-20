import { BASE_URL, getAuthHeaders } from "../config.js";

export async function createTodo(title, description) {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            title,
            description,
            completed: false
        })
    });

    return await response.json();
}
