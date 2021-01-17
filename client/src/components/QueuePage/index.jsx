import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import './style.scss';

const QueuePage= () => {
  let players = [];
  for (let i = 0; i < 10; i++) {
    players.push(i);
  }

  const checkPlayers = () => {
    let value = 3 + 6;
    // let numPlayers = API.getUsers().length;
    const currPlayers = players.map((player) => {
      if (player < value) {
        return <UserOutlined className="player-active" />
      } else {
        return <UserOutlined className="player-inactive" />
      }
    });

    return (
      <div className="live-queue">
        <div className="player-row">
          {currPlayers}
        </div>
        <p className="players-found-text"><span>{value}</span> out of 10 players found</p>
      </div>
    );
  };

  return (
    <div className="queue-page">
      <div className="queue">
        <p className="queue-text">in queue...</p>
        {checkPlayers()}
        <a className="exit-queue" href="/login">exit queue</a>
      </div>
    </div>
  );
};

export default QueuePage;