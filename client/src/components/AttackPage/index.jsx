import React from 'react';
import Navbar from '../Navbar';

import Cancel from '../../assets/Cancel.png';
import Weapons from '../Weapons';

import './style.scss';

const AttackPage = (props) => {
  return (
    <div className="AttackPage">
      <Navbar />
      <div className="weapon-selector">
        <h4 className="select-text">Select and drop a spell in your range!</h4>
        <Weapons />
      </div>
      <div className="button-container">
        <img src={Cancel} alt="cancel" className="cancel" />
      </div>
    </div>
  );
};

export default AttackPage;
