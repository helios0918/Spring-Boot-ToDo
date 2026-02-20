import { BASE_URL, getAuthHeaders } from "../config.js";

export async function updateTodo(id, title, description, completed) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            title,
            description,
            completed
        })
    });

    return await response.json();
}
