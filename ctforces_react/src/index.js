import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';
import { apiUrl } from 'config/config';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import rootReducer from './store';
import App from './pages';


import 'styles/index.scss';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

axios.interceptors.response.use(response => response, (error) => {
    const ret = error;
    if (ret.response.status === 500) {
        ret.response.data = { detail: 'Api server is down' };
    }
    return Promise.reject(ret);
});

toast.configure();

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
