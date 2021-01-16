import React from 'react';

import './style.scss';

const LoginPage= () => {
  const handleUserLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <div className="username-form">
        <form onSubmit={handleUserLogin}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" required></input>
          <input type="submit" value="Play"></input>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;