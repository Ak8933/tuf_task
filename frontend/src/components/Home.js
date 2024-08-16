import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure the correct CSS file is imported

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timerSettings, setTimerSettings] = useState(0);
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://tuf-task-backend-fq5o.onrender.com/banner', {
      description,
      timer_settings: timerSettings,
      link
    })
    .then(response => alert(response.data.message))
    .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <div className="dashboard-container">
      <h2 className="heading">Update Banner</h2>
      <form onSubmit={handleSubmit} className="dashboard-form">
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Timer Settings (seconds):</label>
          <input
            type="number"
            value={timerSettings}
            onChange={(e) => setTimerSettings(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
       
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Dashboard;
