import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">My Tasks</h1>
          <p className="subtitle">Keep track of what matters today.</p>
        </header>

        {/* Main Card */}
        <div className="card">
          {/* Add Task Form */}
          <form className="add-task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              className="task-input"
              placeholder="What needs to be done?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="add-button">
              + Add Task
            </button>
          </form>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="tabs">
              <button
                type="button"
                className={`tab-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`tab-btn ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                type="button"
                className={`tab-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <span className="task-count">
              {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {/* Task List or Empty State */}
          <div className="task-content">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <h3 className="empty-title">
                  {filter === "all"
                    ? "No tasks yet"
                    : filter === "active"
                    ? "No active tasks"
                    : "No completed tasks"}
                </h3>
                <p className="empty-subtitle">
                  {filter === "all"
                    ? "Add your first task above and make today count."
                    : filter === "active"
                    ? "All your tasks are completed!"
                    : "Complete a task to see it listed here."}
                </p>
              </div>
            ) : (
              <ul className="task-list">
                {filteredTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <span
                      className={`task-text ${task.completed ? "completed" : ""}`}
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.text}
                    </span>
                    <button
                      type="button"
                      className="delete-btn"
                      title="Delete task"
                      onClick={() => deleteTask(task.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card Footer */}
          <div className="card-footer">
            <span>
              {completedCount} completed out of {tasks.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

