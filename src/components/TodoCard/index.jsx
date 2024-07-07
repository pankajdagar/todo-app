import React, { useState } from "react";
import "./TodoCard.css";

const TodoCard = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
  };

  return (
    <div className={`todo-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className="todo-title">{task.title}</div>
          <div className="todo-description">{task.description}</div>
          <div className="todo-priority">Priority: {task.priority}</div>
          <div className="todo-actions">
            <div className="todo-checkbox">
              <input
                type="checkbox"
                id="complete"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
              />
              <label htmlFor="complete">Complete</label>
            </div>

            <button onClick={() => !task.completed && handleEdit()}>
              Edit
            </button>
            <button onClick={() => !task.completed && onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
