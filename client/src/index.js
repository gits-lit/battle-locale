import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './store';

// Pages
// Create a container to check the game status to see if the user should be routed to the HomePage or LoginPage
//import isGamingGoing from './containers/isGameGoing';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import OnboardingPage from './containers/OnboardingPage';
import QueuePage from './containers/QueuePage';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/onboarding" component={OnboardingPage} />
          <Route exact path="/queue" component={QueuePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
