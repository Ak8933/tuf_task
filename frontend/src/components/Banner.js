import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css'; // Import the CSS file for styling

const Banner = ({ isVisible, setIsVisible }) => {
  const [banner, setBanner] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    if (isVisible) {
      // Fetch banner data and initialize the timer
      axios.get('http://localhost:5000/banner')
        .then(response => {
          console.log('API Response:', response.data); // Log response data
          if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0]; // Use the first item if it's an array
            setBanner(data);
            setTimer(data.timer_settings);

            // Start countdown timer
            interval = setInterval(() => {
              setTimer(prev => {
                if (prev <= 0) {
                  clearInterval(interval);
                  setIsVisible(false); // Hide the banner when the timer reaches zero
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          } else {
            console.error('Unexpected API response format:', response.data);
          }
        })
        .catch(error => console.error('Error fetching banner:', error));
    } else {
      // If not visible, clear interval if it's set
      if (interval) {
        clearInterval(interval);
      }
    }

    // Cleanup function to clear interval when component unmounts or isVisible changes
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible, setIsVisible]);

  if (!isVisible || !banner || timer <= 0) return null;

  return (
    <div className="banner-container">
      <img src="/download.jpg" alt="Banner" className="banner-image" />
      <div className="banner-overlay">
        <h1>{banner.description}</h1>
        <a href={banner.link} target="_blank" rel="noopener noreferrer">Learn More</a>
        <div className="timer">Time left: {Math.floor(timer / 60)}:{timer % 60}</div>
      </div>
    </div>
  );
};

export default Banner;
