import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import cancelButton from '../../assets/Cancel.png';
import finishButton from '../../assets/Finish.png';

import './style.scss';

const ProgressBar = (props) => {
  const [showProgress, setShowProgress] = useState(true);
  const [progressDone, setProgressDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressTick, setProgessTick] = useState(true);

  useEffect(() => {
    let interval = null;
    if (progressTick) {
      interval = setInterval(() => {
        setProgress(progress => progress + 10);
      }, 1000);
    } else if (progressTick && progress === 100) {
      setProgessTick(false);
      setProgressDone(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [progressTick, progress]);

  const finishProgress = () => {
    setShowProgress(false);
    setProgessTick(false);
    setProgressDone(false);
    setProgress(0);
  };

  const renderProgress = () => {
    return (
      <div className="progress-container">
        <div className="progress-info">
          {
            progressDone ?
              <p className="learn-text">learned {props.name}!</p>
              :
              <p className="learn-text">learning a new skill...</p>
          }
          <Progress percent={progress} className="progress-bar" format={percent => percent + '% complete'} strokeColor="#FFBE2C" trailColor="#BC7408" />
          <p className="progress-text">{props.name}</p>
          <img src={props.img} alt={props.name} className="weapon-img" />
          <p className="progress-text">{props.stats}</p>
          {
            progressDone ?
              <div className="progress-confirm">
                <input type="image" className="progress-button" alt="FINISH" src={finishButton} onClick={finishProgress}></input>
                <p className="progress-text">Do not move</p>
              </div>
              :
              <div className="progress-confirm">
                <input type="image" className="progress-button" alt="CANCEL" src={cancelButton} onClick={finishProgress}></input>
              </div>
          }
        </div>
      </div>
    );
  };

  return (
    <div className="ProgressBar">
      {
        showProgress ?
          renderProgress()
        : null
      }
    </div>
  );
};

export default ProgressBar;