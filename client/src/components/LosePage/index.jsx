import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../Navbar';

import lose from '../../assets/lose.png';

import './style.scss';

const LosePage = (props) => {
  return (
    <div className="LosePage">
      <Navbar />
        <img src={lose} alt="lose" />
    </div>
  );
};

export default LosePage;
