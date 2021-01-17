import React, { useState } from 'react';
import playButton from '../../assets/play_button.png';

import './style.scss';

const LoginPage= (props) => {
  const [username, setUsername] = useState('');
  const handleUserLogin = (e) => {
    e.preventDefault();
    // API.login();
    // switch to /queue
    props.loginUser(username);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleUserLogin} className="username-form">
        <label htmlFor="username">Username</label>
        <input className="name-input" id="username" name="username" required onChange={event => setUsername(event.target.value)} value={username}></input>
        <input type="image" className="play-button" alt="PLAY" src={playButton}></input>
      </form>
    </div>
  );
};

export default LoginPage;