import React, {useEffect, useState} from 'react';
import { HeartFilled } from '@ant-design/icons';
import AmountAlive from '../../components/AmountAlive';

import './style.scss';
import NavLogo from '../../assets/NavLogo.png';

const Navbar = (props) => {
  const [progress, setProgress] = useState(3600);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setProgress(progress => progress - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [progress]);
  return (
    <div className="Navbar">
      <div className="top-row">
        <img className="NavLogo" src={NavLogo} alt="logo" />
        <div className="in-col">
          <h3 className="hp">
            {props.health}HP
            <span className="heart">
              💖
            </span>
          </h3>
          <h3>{Math.floor(progress / 60)} M {progress % 60} S</h3>
          <h4 className="alive">alive</h4>
        </div>
      </div>
      <AmountAlive alive={props.alive} />
      <div className="notif-container">
        <h4 className="notification">{props.notif}</h4>
      </div>
    </div>
  );
};

export default Navbar;
