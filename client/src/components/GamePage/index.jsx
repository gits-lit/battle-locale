import React from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import './style.scss';

const GamePage = () => {
  return (
    <div className="game-page">
      <Navbar notif={'Meowlord has been slain by Snu'} />
      <Footer />
    </div>
  );
};

export default GamePage;
