import { BASE_URL, getAuthHeaders } from "../config.js";

export async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    return await response.text();
}
