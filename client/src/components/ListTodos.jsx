import React, { useEffect, useState } from 'react';

function ListTodos() {
  const [todos, setTodos] = useState([]);

//Delete function

const deleteTodo = async (id) => {
  try{
   const deleteTodo = await fetch(`http://localhost:9000/todos/${id}`, {
    method: "DELETE"
   });

setTodos(todos.filter(todo => todo.todo_id !== id));

  }catch(err){
    console.error(err.message)
  }
}



  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:9000/todos");
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
      <h2 className="text-center mt-5">Todo List</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodos;