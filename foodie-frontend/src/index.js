import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import './styles/normalize.css';
import './styles/style.css';

// Require favicon image for build on 'npm run build'
import './assets/favicon-32x32.png';
import './assets/favicon-16x16.png';

import Homepage from './components/Homepage/Homepage';
import SearchResults from './components/SearchResults/SearchResults';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/results/q" component={SearchResults} />
  </Router>
  , document.getElementById('app')
);
