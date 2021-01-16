import React, { useState } from 'react';

import './style.scss';

const OnboardingPage= (props) => {
  const [showOnboarding, setShowOnboarding] = useState(true)

  const handlePlay = () => {
    props.startLocation();
    setShowOnboarding(false);
  }

  return (
    <div className="onboarding-page">
      {
        showOnboarding ?
        <div className="onboarding-carousel">
          <h1>Onboarding Page</h1>
          <button onClick={handlePlay}>Play</button>
        </div>
        : null
      }
    </div>
  );
};

export default OnboardingPage;