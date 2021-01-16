import React from 'react';
import playButton from '../../assets/play_button.png';

import './style.scss';

const LoginPage= () => {
  const handleUserLogin = (e) => {
    e.preventDefault();
    // API.login();
    // switch to /queue
  };

  return (
    <div className="login-page">
      <form onSubmit={handleUserLogin} className="username-form">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" required></input>
        <input type="image" className="play-button" alt="PLAY" src={playButton}></input>
      </form>
    </div>
  );
};

export default LoginPage;