import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import AmountAlive from '../../components/AmountAlive';

import './style.scss';
import NavLogo from '../../assets/NavLogo.png';

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <div className="top-row">
        <img className="NavLogo" src={NavLogo} alt="logo" />
        <div className="in-col">
          <h3 className="hp">
            {32}HP
            <span className="heart">
              💖
            </span>
          </h3>
          <h3>3m 21s</h3>
          <h4 className="alive">alive</h4>
        </div>
      </div>
      <AmountAlive alive={8} />
      <div className="notif-container">
        <h4 className="notification">{props.notif}</h4>
      </div>
    </div>
  );
};

export default Navbar;
