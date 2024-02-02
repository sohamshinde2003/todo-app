import React, { useState } from 'react'
import { addTask } from '../api-firebase/api-config';

export default function AddTaskDialog({ onClose }) {
  const [formData, setFormData] = useState({
    taskName: '',
    priority: 'Urgent',
    taskDeadline: '',
    taskDescription: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.taskName || !formData.taskDeadline || !formData.taskDescription) {
      alert('All fields are required');
      return;
    }

    // Handle the form submission logic here
    console.log('Form data submitted:', formData);
    addTask(formData);
    // Clear the form fields after submission if needed
    setFormData({
      taskName: '',
      priority: 'Urgent',
      taskDeadline: '',
      taskDescription: '',
    });
    onClose();
  };
  const getFormattedDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="dialog-layout" style={{ display: 'flex' }}>
      <div className="dialog-content entity-add-form">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Task</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="taskName">Title</label>
          <input
            type="text"
            id="taskName"
            value={formData.taskName}
            onChange={handleChange}
            required
          />

          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <label htmlFor="taskDeadline">Date & Time (End):</label>
          <input
            type="datetime-local"
            id="taskDeadline"
            value={formData.taskDeadline}
            onChange={handleChange}
            min={getFormattedDefaultDate()}
            required
          />

          <label htmlFor="taskDescription">Note:</label>
          <textarea
            id="taskDescription"
            rows="4"
            value={formData.taskDescription}
            onChange={handleChange}
            required
          ></textarea>

          <button className="btn" type="submit">Assign Task</button>
        </form>
      </div>
    </div>
  );
}
