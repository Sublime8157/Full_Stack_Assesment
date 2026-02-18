import { useEffect, useState } from "react";
import api from "./api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");

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

  const handleAddTask = async (e) => {
    e.preventDefault()

    if(!newTitle.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: newTitle.trim(), 
        isDone: false, 
        userId: 1, // hardcoded as i was not able to support adding a user route on backend
      }); 

      setTasks((prev) => [...prev, res.data]); 
      setNewTitle("");
    }
    catch(error){
        console.error(err)
        alert("Failed to add task.")
    }
    
  }
  
  const handleToggle = async (task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, {
        title: task.title,
        isDone: !task.isDone,
      });

      setTasks((prev) => 
        prev.map((t) => (t.id === task.id ? res.data : t))
      );
    }
    catch (error) {
      console.error(err);
      alert("Failed to toggle task.")
    }
  }
  
  const handleEdit = async (task) => {
    const updatedTitle = prompt("Edit task title:", task.title)

    if(updatedTitle === null) return;
    if(!updatedTitle.trim()) return alert("Title cannot be empty."); 

    try {
      const res = await api.put(`/tasks/${task.id}`, {
        title: updatedTitle.trim(), 
        isDone: task.isDone,
      })

      setTasks((prev) => 
        prev.map((t) => (t.id === task.id ? res.data : t))
      );
    } catch (err) {
      console.error(err); 
      alert("Failed to update task.")
    }

  }
  
  const handleDelete = async (task) => {
    const ok = confirm("Delete this task?")
    const id = task.id
    if(!ok) return

    try {
      await api.delete(`/tasks/${id}`)

      setTasks((prev) => prev.filter((t) => t.id !== id)); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.")
    }
    
  }
  
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      {/* Add Form */}
      <form onSubmit={handleAddTask} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks found.</p>
      )}

      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-row items-center justify-between px-12 bg-white shadow rounded p-4"
          >
            <div className="flex flex-col items-start" >
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
            </div>
            <div className="flex gap-4 flex-row justify-center items-center">
              <button
              onClick={() => handleToggle(task)}
              className="text-sm shadow-sm bg-gray-400 text-white px-3 py-1 border rounded hover:bg-gray-200"
              >
                Toggle
              </button>
              <button
                onClick={() => handleEdit(task)}
                className="px-3 text-sm py-1 border bg-blue-300 text-white rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task)}
                className="px-3 text-sm py-1 border bg-red-300 text-white rounded hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
            </li>
        ))}
      </ul>
    </main>
  );
}

export default Tasks;
