import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './pages/reducer';
import { BrowserRouter } from 'react-router-dom';
import { history } from './constants/history';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter history={history}>
        <App/>
      </BrowserRouter>
    </Provider>,
    
    
  document.getElementById('root')
);


serviceWorker.unregister();
