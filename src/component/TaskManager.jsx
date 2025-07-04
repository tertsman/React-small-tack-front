import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdClear } from "react-icons/md";
const TaskManager = ({ filter }) => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  // Add new task
  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setTaskText("");
    setPriority("Medium");
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    if (window.confirm("Are you sure?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Edit task
  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText && newText.trim()) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    }
  };

  // Clear completed tasks
  const clearCompleted = () => {
    if (window.confirm("Clear all completed tasks?")) {
      setTasks(tasks.filter((t) => !t.completed));
    }
  };

  // Get filtered tasks based on filter prop
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt);
    const now = new Date();

    switch (filter) {
      case 1: // Today
        return (
          taskDate.getDate() === now.getDate() &&
          taskDate.getMonth() === now.getMonth() &&
          taskDate.getFullYear() === now.getFullYear()
        );
      case 2: // Upcoming
        return taskDate > now;
      case 3: // Completed
        return task.completed === true;
      default: // All
        return true;
    }
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getPriorityColor = (p) => {
    switch (p) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <h2 className="">Task Manager</h2>
      <div className="task-input-section">
        <input
          type="text"
          placeholder="New task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="task-summary">
        <p>
          Total: {tasks.length} | Completed: {completedCount}
        </p>
        <div
          className="progress-bar"
          style={{
            background: "#eee",
            width: "100%",
            height: "5px",
            borderRadius: "5px",
          }}
        >
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "green",
              borderRadius: "5px",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? "completed" : ""}`}
              style={{
                borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#F8F8F8",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <h3
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </h3>
                  <small >
                    {new Date(task.createdAt).toLocaleString()} •{" "}
                    <span style={{ color: getPriorityColor(task.priority) }}>
                      {task.priority}
                    </span>
                  </small>
                </div>
              </div>
              <div>
                <button
                  onClick={() => editTask(task.id)}
                  style={{ marginRight: "5px" }}

                >
                  <CiEdit size={16} style={{color: "green"}}/>
                </button>
                <button onClick={() => deleteTask(task.id)}><MdClear size={16} style={{color: "red"}}/> </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="clear-btn" onClick={clearCompleted}>
        Clear Completed Tasks
      </button>
    </div>
  );
};

export default TaskManager;
