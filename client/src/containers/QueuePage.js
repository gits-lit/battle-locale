import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import QueuePage from '../components/QueuePage';

import {getAllUsers, redirectHome} from '../actions/UserActions';

const QueuePageContainer = (props) => {

  const [start, setStart] = useState(false);

  useEffect(() => {
    props.getAllUsers();
    setTimeout(function(){
      console.log('hello');
      setStart(true);
      setTimeout(function(){
        props.redirectHome();
      }, 3000);
    }, 10000);
  }, []);

  return (
    <QueuePage numberOfUsers={props.count} start={start}/>
  );
};

const mapStateToProps = state => {
  return {
    count: state.alluser.count
  };
};

export default connect(
  mapStateToProps,
  { redirectHome, getAllUsers }
)(QueuePageContainer);