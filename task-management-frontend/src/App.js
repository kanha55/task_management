import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const refreshTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => filter === 'all' || task.status === filter);

  return (
    <div>
      <TaskForm refreshTasks={refreshTasks} />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <TaskList tasks={filteredTasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default App;