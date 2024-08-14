import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timerSettings, setTimerSettings] = useState(0);
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/banner', {
      description,
      timer_settings: timerSettings,
      link
    })
    .then(response => alert(response.data.message))
    .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Timer Settings (seconds):</label>
        <input
          type="number"
          value={timerSettings}
          onChange={(e) => setTimerSettings(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Dashboard;
