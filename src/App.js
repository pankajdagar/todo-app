import React, { useState, useEffect } from "react";
import "./App.css";
import { SORT_ORDER, days } from "./constants";
import AddTask from "./components/AddTask";
import TodoCard from "./components/TodoCard";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.DEFAULT);

  // BONUS : Implement data persistence, so that tasks are stored and retrieved even after the page refreshes.
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]); // Assigning EPOCH Value to ID as it's on client only, can be replaced by uuid too
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // BONUS : Add the ability to mark tasks as completed and filter tasks based on their completion status.

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  // BONUS : Implement task prioritization (e.g., high, medium, low) and allow users to sort tasks based on priority.
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorities = { high: 3, medium: 2, low: 1 };
    if (sortOrder === SORT_ORDER.HTL) {
      return priorities[b.priority] - priorities[a.priority];
    }
    if (sortOrder === SORT_ORDER.LTH) {
      return priorities[a.priority] - priorities[b.priority];
    }
    return a.id - b.id; // Default sorting (by id)
  });

  return (
    <div className="App">
      <h1>Welcome to your Task Manager</h1>
      <h2>Happy {days[new Date().getDay()]} !!</h2>
      <div className="section">
        <AddTask onAdd={addTask} />
        <div>
          <div className="controls">
            <button
              className={`${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`${filter === "incomplete" ? "active" : ""}`}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete
            </button>
          </div>
          <div className="sort-controls">
            <span>Sort by: </span>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value={SORT_ORDER.DEFAULT}>Default</option>
              <option value={SORT_ORDER.HTL}>High to Low</option>
              <option value={SORT_ORDER.LTH}>Low to High</option>
            </select>
          </div>
          <div className="task-list">
            {sortedTasks.map((task) => (
              <TodoCard
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
