import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

const withAuth = Component => props => {
  useEffect(() => {
    if (!props.name) {
      props.redirectLogin();
    }
  });

  // TODO: Make redirecting screen and return that if not authenticated.
  return <Component {...props} />;
};

const mapStateToProps = state => ({
  name: state.user.name
});

const mapDispatchToProps = dispatch => ({
  redirectLogin: () => {
    dispatch(replace('/login'));
  },
});

const requireAuth = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuth
)

export default requireAuth;