import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import Homepage from './components/Homepage/Homepage.js';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
  </Router>
  , document.getElementById('app')
);
