import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect, hashHistory } from 'react-router';

// 菜单
import Menu from './menu.jsx';
// page *****************************
// 首页
import Index from './page/index/index.jsx'

// import {dva} from 'yzf-react-storage';
// import admin_models from './models/admin_models.jsx';
// import bookstores_models from './models/bookstores_models.jsx';

const RouteApp = () => (<Router history={hashHistory}>
    <Redirect from="/" to="/index"/>
    {/* <Redirect from="/article" to="/article/card"/> */}
    <Route path='/' component={Menu}>
        <Route path='/index' component={Index}/>
    </Route>
  </Router>)

// const App = dva();
// App.model(admin_models);

ReactDOM.render(<RouteApp/>, document.getElementById('root'));

