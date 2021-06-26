import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Routes from './Routes';
// import {BrowserRouter as Router} from 'react-router-dom';
import { BrowserRouter as Router, } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { socket } from 'components/WebSocket/connectSocket'

const browserHistory = createBrowserHistory();


socket.on("connect", () => {
  console.log(socket.id + " đã kết nối!");
});

const App: React.FC = props => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

App.propTypes = {

};

export default App;



