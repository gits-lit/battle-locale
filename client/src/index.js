import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './style.scss';

import configureStore, { history } from './store';

// Pages
// Create a container to check the game status to see if the user should be routed to the HomePage or LoginPage
//import isGamingGoing from './containers/isGameGoing';
import LosePage from './components/LosePage';
import WinPage from './components/WinPage';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import QueuePage from './containers/QueuePage';
import GamePage from './components/GamePage';
import AttackPage from './components/AttackPage';
import requireAuth from './containers/requireAuth';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
        <Route exact path="/Lose" component={LosePage} />
          <Route exact path="/win" component={WinPage} />
          <Route exact path="/attack" component={AttackPage} />
          <Route exact path="/game" component={GamePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/queue" component={requireAuth(QueuePage)} />
          <Route path="/" component={requireAuth(HomePage)} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
