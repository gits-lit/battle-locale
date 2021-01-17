import React from 'react';
import Navbar from '../Navbar';

import './style.scss';

const GamePage = () => {
  return (
    <div className="game-page">
      <Navbar notif={'Meowlord has been slain by Snu'} />
    </div>
  );
};

export default GamePage;
