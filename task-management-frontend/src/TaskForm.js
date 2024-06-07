import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/v1/tasks', { title, description, status });
            refreshTasks();
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrorMessage('Unprocessable Entity: ' + error.response.data);
            } else {
              console.error(error);
            }
        }
    };

    return (
        <div className="card mt-3">
            <div className="card-body">
                {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="">Select status</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Task</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;