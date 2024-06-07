import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = ({ tasks, refreshTasks }) => {
  const [filter, setFilter] = useState('all');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${id}`);
      refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:3001/api/v1/tasks/${id}`, { status });
      refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => filter === 'all' || task.status === filter);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>Tasks</div>
          <Link to="/create" className="btn btn-success ">Create</Link>
          <select className="form-select form-select-sm" style={{width: 'auto'}} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <select className="form-select form-select-sm" value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;