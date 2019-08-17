import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './app/index.js';

import {dva} from 'yzf-react-storage';
import admin_models from './models/admin_models.jsx';
import bookstores_models from './models/bookstores_models.jsx';
const App = dva(AppComponent);


App.model(admin_models);

// 书城
App.model(bookstores_models);

ReactDOM.render(<App />, document.getElementById('root'));

