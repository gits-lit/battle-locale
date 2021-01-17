import React, { useState, useEffect } from 'react';

import WeaponSlot from '../../assets/WeaponSlot.png';
import WeaponData from '../../weapons.json';

import './style.scss';

const Weapons = (props) => {
  const weapons = []
  if (props.arcane) {
    weapons.push('arcane')
  }
  if (props.fireball) {
    weapons.push('fireball');
  }
  if (props.heal) {
    weapons.push('heal')
  }
  if (props.icebolt) {
    weapons.push('icebolt')
  }

  for (let i = 0; i = 5-weapons.length; i++) {
    weapons.push(null)
  }
  /*const [weapons, setWeapons] = useState([
    'arcane',
    null,
    null,
    null,
    null,
  ]);*/

  const listItems = weapons.map((weapon) => <WeaponSlots weapon={weapon} />);

  return (
    <div className="weapons">
      <div className="weapons-row">{listItems}</div>
    </div>
  );
};

const WeaponSlots = (props) => {
  let data = props.weapon;
  let active = false;
  if (props.weapon != null) {
    active = true;
  }

  return (
    <div className="weapon-slot">
      {active ? (
        <img src={WeaponData[data].image} alt="weapon" className="weapon" />
      ) : null}
      <img src={WeaponSlot} alt="weapon" className="slot" />
    </div>
  );
};

export default Weapons;
