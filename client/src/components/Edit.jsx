import React, { useState } from 'react';

const Edit = ({ todo, updateTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:9000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      // Update the todo in the parent component state
      updateTodo({
        ...todo,
        description: newDescription,
      });

      // Exit edit mode after saving
      setEditMode(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    // Reset the description to the original todo description
    setNewDescription(todo.description);
    // Exit edit mode
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div>
        <input
          type="text"
          className="form-control"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className="btn btn-primary mt-2 mr-2" onClick={handleUpdate}>
          Save
        </button>
        <button className="btn btn-secondary mt-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  } else {
    return (
      <button className="btn btn-info" onClick={() => setEditMode(true)}>
        Edit
      </button>
    );
  }
};

export default Edit;
