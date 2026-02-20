export const BASE_URL = "http://localhost:8080";

export function getToken() {
    return localStorage.getItem("token");
}

export function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}
