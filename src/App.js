import React from 'react';
import TaskList from './contatiners/Tasklist';
import './App.css'; 

const App = () => {
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;
