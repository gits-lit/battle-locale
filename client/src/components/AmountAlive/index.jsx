import React from 'react';

import Person from '../../assets/persona-a.svg';
import Personua from '../../assets/persona-ua.svg';

import './style.scss';

const AmountAlive = (props) => {
  return (
    <div className="AmountAlive">
      <h3 className="alive-text">{props.alive} players remain</h3>
      <div className="person-container">
        {[...Array(props.alive)].map((e, i) => (
          <img className="person-a" src={Person} alt="person" />
        ))}
        {[...Array(10 - props.alive)].map((e, i) => (
          <img className="person-ua" src={Personua} alt="person" />
        ))}
      </div>
    </div>
  );
};

export default AmountAlive;
