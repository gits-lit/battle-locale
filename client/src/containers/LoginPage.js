import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';
import {
  loginUser
} from '../actions/UserActions';

const LoginPageContainer = (props) => {
  const handleLoginUser = (username) => {
    props.loginUser(username);
  }

  return (
    <LoginPage loginUser={handleLoginUser}/>
  );
};

export default connect(
  null,
  { loginUser }
)(LoginPageContainer);
