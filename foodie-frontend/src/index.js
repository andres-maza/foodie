import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import Homepage from './components/Homepage/Homepage.js';
import SearchResults from './components/SearchResults/SearchResults.js';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/results/:lat/:lng" component={SearchResults} />
  </Router>
  , document.getElementById('app')
);
