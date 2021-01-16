import React, { useState } from 'react';
import Flickity from 'react-flickity-component';

import './style.scss';
import "./flickity.css";

import onboarding1 from '../../assets/onboarding1.png';
import onboarding2 from '../../assets/onboarding2.png';
import onboarding3 from '../../assets/onboarding3.png';

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
        <div className="onboarding-container">
          <Flickity
            className={'onboarding=carousel'} // default ''
            elementType={'div'} // default 'div'
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static // default false
          >
            <div className="slide">
              <img src={onboarding1}/>
            </div>
            <div className="slide">
              <img src={onboarding2}/>
            </div>
            <div className="slide">
              <button onClick={handlePlay}>Play</button>
              <img src={onboarding3}/>
            </div>
          </Flickity>
        </div>
        : null
      }
    </div>
  );
};

export default OnboardingPage;