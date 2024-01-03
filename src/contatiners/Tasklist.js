import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import './TaskList.css'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleEdit = (taskId, title) => {
    setEditTask(taskId);
    setEditedTitle(title);
  };

  const handleDelete = (taskId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleSaveEdit = (taskId, newTitle) => {
    if (newTitle.trim() === '') {
      return;
    }
    axios.patch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, { title: newTitle })
      .then(() => {
        setTasks(tasks.map(task => (task.id === taskId ? { ...task, title: newTitle } : task)));
        setEditTask(null);
        setEditedTitle('');
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleSearch = () => {
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filteredTasks);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  return (
    <div>
      <div className="search-container">
        <div className='search-handler'>
          <h2>Search Title</h2>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
          <button className="reset-search-button" onClick={handleResetSearch}>Reset</button>
        </div>
        <div>
          <AddTask onAddTask={handleAddTask} />
        </div>
      </div>
      <h2>Task List</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                {editTask === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      required
                    />
                    <div style={{display:"inline"}}>
                      <button style={{marginRight:"10px"}} className="submit-button" onClick={() => handleSaveEdit(task.id, editedTitle)}>Submit</button>
                    <button className="cancel-button" onClick={() => setEditTask(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span>{task.title}</span>
                )}
              </td>
              <td>
                {editTask === task.id ? null : (
                  <div className='button-container'>
                    <button className="edit-button" onClick={() => handleEdit(task.id, task.title)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
