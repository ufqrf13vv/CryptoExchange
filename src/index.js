import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//  styles
import './assets/css/foundation.css';
import './assets/css/app.css';
//  components
import AppRouter from './components/AppRouter';


const store = createStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);