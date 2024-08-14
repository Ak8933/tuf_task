import React, { useState } from 'react';
import Banner from './Banner';

function App() {
    // Initialize state to track the switch
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    // Handle switch toggle
    const handleSwitchChange = (event) => {
        setIsSwitchOn(event.target.checked);
    };

    return (
        <>
            <div className="form-check form-switch ">
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
            {isSwitchOn && <Banner/>}

        </>

    );
}

export default App;
