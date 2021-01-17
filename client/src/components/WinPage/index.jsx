import React from 'react';
import Navbar from '../Navbar';

import win from '../../assets/win.png';

import './style.scss';

const WinPage = (props) => {
  return (
    <div className="WinPage">
      <Navbar />
      <img src={win} alt="win" />

    </div>
  );
};

export default WinPage;
