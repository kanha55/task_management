import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import TaskList from './TaskList';
import CreateTask from './CreateTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const refreshTasks = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tasks`);
    setTasks(data);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} refreshTasks={refreshTasks} filter={filter} />} />
          <Route path="/create" element={<CreateTask refreshTasks={refreshTasks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;