import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './App.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
