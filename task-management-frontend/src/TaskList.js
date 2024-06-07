import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, refreshTasks }) => {
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

    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {tasks.map((task) => (
                <li key={task.id} style={{ margin: '1em', padding: '1em', border: '1px solid #ddd' }}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button style={{ marginLeft: '1em' }} onClick={() => handleDelete(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;