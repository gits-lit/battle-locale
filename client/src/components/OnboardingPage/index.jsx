import React, { useState } from 'react';
import Flickity from 'react-flickity-component';
import { EnvironmentFilled, HomeFilled } from '@ant-design/icons';
import playButton from '../../assets/play_button.png';

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
              <div className="tip" id="tip1">
                <p className="tip-title">tip one</p>
                <p className="tip-text">Move to the center to avoid taking damage!</p>
              </div>
            </div>
            <div className="slide">
              <div className="tip">
                <p className="tip-title">tip two</p>
                <p className="tip-text">Go to landmarks to get weapons to damage friends!</p>
                <EnvironmentFilled className="tip-icon" />
              </div>
            </div>
            <div className="slide">
              <div className="tip">
                <p className="tip-title">tip three</p>
                <p className="tip-text">Have fun, but do not enter private property!</p>
                <HomeFilled className="tip-icon" />
              </div>
              <input type="image" className="play-button" alt="PLAY" src={playButton} onClick={handlePlay}></input>
            </div>
          </Flickity>
        </div>
        : null
      }
    </div>
  );
};

export default OnboardingPage;