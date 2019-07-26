import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Route, BrowserRouter } from 'react-router-dom'
import { createLogger } from 'redux-logger';
import Library from './components/Library';
import rootReducer from './reducers'
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import * as serviceWorker from './serviceWorker';
import RegisterPage from './components/RegisterPage';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware))

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                    <Route path='/register' exact component={RegisterPage} />
                    <Route path='/home' exact component={Library} />
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 