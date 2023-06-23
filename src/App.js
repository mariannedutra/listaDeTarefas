import React, { useState } from 'react';
import './App.css'

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleInputChange = (event) => {
    if (editingIndex !== null) {
      setEditingTask(event.target.value);
    } else {
      setNewTask(event.target.value);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingTask('');
  };

  const saveTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editingTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingTask('');
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = `✓ ${updatedTasks[index]}`;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Remove a tarefa da lista de favoritos, se estiver presente
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
  };

  const addToFavorites = (index) => {
    const taskToAdd = tasks[index];
    if (!favorites.includes(taskToAdd)) {
      setFavorites([...favorites, taskToAdd]);
    }
  };

  const removeFromFavorites = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={editingIndex !== null ? editingTask : newTask}
        onChange={handleInputChange}
        placeholder="Digite uma nova tarefa"
      />
      {editingIndex !== null ? (
        <>
          <button onClick={saveTask}>Salvar</button>
          <button onClick={cancelEditing}>Cancelar</button>
        </>
      ) : (
        <button onClick={addTask}>Adicionar</button>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editingTask}
                onChange={handleInputChange}
              />
            ) : (
              <span>{task}</span>
            )}
            {editingIndex === index ? (
              <>
                <button onClick={saveTask}>Salvar</button>
                <button onClick={cancelEditing}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditing(index)}>Editar</button>
                <button onClick={() => completeTask(index)}>Concluir</button>
                {favorites.includes(task) ? (
                  <button onClick={() => removeFromFavorites(index)}>
                    Remover dos Favoritos
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(index)}>
                    Adicionar aos Favoritos
                  </button>
                )}
                <button onClick={() => removeTask(index)}>Remover</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Favoritos:</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      ) : (
        <p>Não há tarefas favoritas.</p>
      )}
    </div>
  );
};

export default TodoApp;
