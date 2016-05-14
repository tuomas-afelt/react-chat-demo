import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';
import MainLayout from './layouts/main/MainLayout.jsx';
import Login from './components/login/Login.jsx';
import Channels from './components/channels/Channels.jsx';
import Chat from './components/chat/Chat.jsx';

persist(alt, storage, 'app');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Login} />
      <Route path="/channels" component={Channels} />
      <Route path="/channels/:channelId" component={Chat} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.getElementById('app'));
