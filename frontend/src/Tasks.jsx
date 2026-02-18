import { useEffect, useState } from "react";
import api from "./api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}

      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white shadow rounded p-4"
          >
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p
              className={`text-sm ${
                task.isDone ? "text-green-600" : "text-orange-500"
              }`}
            >
              {task.isDone ? "Done" : "Not yet"}
            </p>
            <p className="text-xs text-gray-500">
              User ID: {task.userId}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Tasks;
