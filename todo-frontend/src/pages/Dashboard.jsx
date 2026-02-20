import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      alert("Unauthorized");
    }
  };

  const addTodo = async () => {
    if (!title) return;
    await API.post("/todos", { title, description, completed });
    setTitle("");
    setDescription("");
    setCompleted(false);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    await API.put(`/todos/${id}`, {
      title,
      description,
      completed,
    });

    setEditingId(null);
    setTitle("");
    setDescription("");
    setCompleted(false);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Todo Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome, {localStorage.getItem("userEmail")}
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userEmail");
              window.location.href = "/";
            }}
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 text-sm text-gray-600">
          Total Tasks: {todos.length} | Completed:{" "}
          {todos.filter((t) => t.completed).length}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            {editingId ? "Update Task" : "Add New Task"}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-4 h-4"
              />
              Mark as completed
            </label>

            {editingId ? (
              <button
                onClick={() => updateTodo(editingId)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Update
              </button>
            ) : (
              <button
                onClick={addTodo}
                className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Add Task
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No tasks yet. Start by adding one
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <h4
                    className={`font-medium ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </h4>
                  {todo.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {todo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {todo.completed && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setTitle(todo.title);
                      setDescription(todo.description);
                      setCompleted(todo.completed);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
