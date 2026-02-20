import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import { createTodo } from "./todo/createTodo.js";
import { getTodos } from "./todo/getTodos.js";

async function runApp() {
    try {
        await registerUser("Harshith", "harshith@test.com", "123456");

        
        await loginUser("harshith@test.com", "123456");

        
        await createTodo("Finish Project", "Complete Spring Boot backend");

        
        const todos = await getTodos();
        console.log("My Todos:", todos);

    } catch (error) {
        console.error("Error:", error);
    }
}

runApp();
