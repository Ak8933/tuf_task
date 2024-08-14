import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = ({ isVisible }) => {
  const [banner, setBanner] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (isVisible) {
      axios.get('http://localhost:5000/banner')
        .then(response => {
          const data = response.data[0]; // Assuming you want the first banner
          setBanner(data);
          setTimer(data.timer_settings);

          // Countdown Timer
          const interval = setInterval(() => {
            setTimer(prev => {
              if (prev <= 0) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(interval);
        })
        .catch(error => console.error('Error fetching banner:', error));
    }
  }, [isVisible]);

  if (!isVisible || !banner) return null;

  return (
    <div>
      <h1>{banner.description}</h1>
      <a href={banner.link} target="_blank" rel="noopener noreferrer">Learn More</a>
      <div>Time left: {Math.floor(timer / 60)}:{timer % 60}</div>
    </div>
  );
};

export default Banner;
