import React, { useEffect, useState } from 'react';
import Edit from './Edit';

function ListTodos() {
  const [todos, setTodos] = useState([]);

  // Delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:9000/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update function
  const updateTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:9000/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const jsonData = await response.json();
        setTodos(jsonData); // Update state with fetched data
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="container">
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td className="align-middle">
                <Edit todo={todo} updateTodo={updateTodo} />
              </td>
              <td className="align-middle">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodos;
