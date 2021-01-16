import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import './style.scss';

const QueuePage= () => {
  const checkPlayers = () => {
    let value = 3 + 3;
    // let numPlayers = API.getUsers().length;
    return (
      <div className="live-queue">
        <div className="player-row-one">
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
        </div>
        <div className="player-row-two">
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
        </div>
        <p className="players-found-text"><span>{value}</span> out of 10 players found</p>
      </div>
    );
  };

  return (
    <div className="queue-page">
      <h1>Queue Page</h1>
      <div className="queue">
        <p className="queue-text">in queue...</p>
        <div className="player-row-one">
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
        </div>
        <div className="player-row-two">
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
          <UserOutlined />
        </div>
        <p className="players-found-text">{checkPlayers()} out of 10 players found</p>
      </div>
      <div className="exit-link">
        <a className="exit-queue" href="/login">exit queue</a>
      </div>
    </div>
  );
};

export default QueuePage;