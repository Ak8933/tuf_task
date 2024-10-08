import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import Banner from './components/Banner';

function App() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
  };

  return (
    <div>
      <Navbar />
      <div className="form-check form-switch main">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isSwitchOn}
          onChange={handleSwitchChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Banner Visibility
        </label>
      </div>

      <Banner isVisible={isSwitchOn} setIsVisible={setIsBannerVisible}/>
      <Home />
    </div>
  );
}

export default App;
