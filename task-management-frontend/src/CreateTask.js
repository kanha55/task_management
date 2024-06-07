import React from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';

const CreateTask = ({ refreshTasks }) => {
	return (
		<div>
			<h2>Create a new task</h2>
			<TaskForm refreshTasks={refreshTasks} />
			<Link to="/" className="btn btn-secondary mt-3">Back to Task List</Link>
		</div>
	);
};

export default CreateTask;