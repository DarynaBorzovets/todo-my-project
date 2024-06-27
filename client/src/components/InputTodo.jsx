import React, { useState } from 'react';

function InputTodo() {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:9000/todos', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      });
      
      console.log(response); // Check response status

      // Optionally, clear input field after successful submission
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type='text'
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter todo description..."
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}

export default InputTodo;