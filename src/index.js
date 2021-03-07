import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// we'll need { combineReducers } (section 15 of lec)
// when we want to add 'tags' as a state eventually
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reducer from './store/reducer';

// import reportWebVitals from './reportWebVitals';

// middleware
const logger = store => {

  return next => {
    return action => {
      // console.trace('[middleware]');
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState());
      return result;
    }
  }
}
const store = createStore(reducer, applyMiddleware(logger));


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
