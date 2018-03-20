import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from './components/Root'
import allReducers from './reducers';

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <Router>
      <Root/>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)

registerServiceWorker();
