import React from 'react';

const TodoList = ({ tasks, handleTaskComplete, handleTaskDelete }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            {task.title}
          </span>
          <button onClick={() => handleTaskComplete(index)}>Concluir</button>
          <button onClick={() => handleTaskDelete(index)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
