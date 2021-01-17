import React from 'react';

import Footer from '../Footer';

import './style.scss';

const GamePage = (props) => {
  return (
    <div className="game-page">
      <Footer enableAttack={props.enableAttack} enableLearning={props.enableLearning}/>
    </div>
  );
};

export default GamePage;
