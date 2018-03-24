import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import Root from './components/Root'
import allReducers from './reducers';
import {loadState, saveState} from './util/localState';

const persistedState = loadState();

const store = createStore(
    allReducers,
    persistedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

store.subscribe(() => {
  saveState(store.getState());
});

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
