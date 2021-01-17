import React from 'react';
import Weapons from '../../components/Weapons';

import Learn from '../../assets/Learn.png';
import Attack from '../../assets/Attack.png';

import './style.scss';

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="button-row">
          <img onClick={props.enableLearning} src={Learn} alt="learn" className="a-button" />
          <img onClick={props.enableAttack} src={Attack} alt="attack" className="a-button" />
        </div>
        <Weapons />
      </div>
    </div>
  );
};

export default Footer;
