import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import axios from 'axios';

import './styles/normalize.css';
import './styles/style.css';

import Homepage from './components/Homepage/Homepage.js';
import SearchResults from './components/SearchResults/SearchResults.js';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/results/q" component={SearchResults} />
  </Router>
  , document.getElementById('app')
);
