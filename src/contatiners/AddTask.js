import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    axios.post('https://jsonplaceholder.typicode.com/todos', { title: newTaskTitle })
      .then(response => onAddTask(response.data))
      .catch(error => console.error('Error adding task:', error));

    setNewTaskTitle('');
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter task title"
        required
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
