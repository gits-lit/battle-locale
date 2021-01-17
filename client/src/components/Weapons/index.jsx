import React from 'react';

import WeaponSlot from '../../assets/WeaponSlot.png';
import WeaponData from '../../weapons.json';

import './style.scss';

const Weapons = (props) => {
  return (
    <div className="weapons">
      <div className="weapons-row">
        <WeaponSlots weapon="arcane" />
        <WeaponSlots weapon="arcane" />
        <WeaponSlots weapon="arcane" />
        <WeaponSlots weapon="arcane" />
        <WeaponSlots weapon="arcane" />
      </div>
    </div>
  );
};

const WeaponSlots = (props) => {
  return (
    <div className="weapon-slot">
      {WeaponData.map((item) => (
        <div>
          <img src={props.weapon.item.image} alt="weapon" className="weapon" />
          <img src={WeaponSlot} alt="weapon" className="weapon" />
        </div>
      ))}
    </div>
  );
};

export default Weapons;
