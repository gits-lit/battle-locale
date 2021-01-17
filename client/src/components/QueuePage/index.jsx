import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import './style.scss';

const QueuePage= (props) => {
  let players = [];
  for (let i = 0; i < 10; i++) {
    players.push(i);
  }

  const checkPlayers = () => {
    const currPlayers = players.map((player) => {
      if (player < props.numberOfUsers) {
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
        <p className="players-found-text"><span>{props.numberOfUsers}</span> out of 10 players found</p>
      </div>
    );
  };

  return (
    <>
    {!props.start ?
    <div className="queue-page">
      <div className="queue">
        <p className="queue-text">in queue...</p>
        {checkPlayers()}
        <a className="exit-queue" href="/login">exit queue</a>
      </div>
    </div>
    :
    <div className="queue-page-start"></div>
    }
    </>
  );
};

export default QueuePage;