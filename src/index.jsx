import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';

// 菜单
import Menu from './menu.jsx';
// const Menu = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./menu.jsx').default)
//   }, 'a')
// }
// page *****************************
// 首页
import Index from './page/index/index.jsx';
// const Index = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/index/index.jsx').default)
//   }, 'b')
// }
// 下单列表
import TabPage from './page/tabPage/tabPage';
// const TabPage = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/tabPage/tabPage').default)
//   }, 'c')
// }
// 设备列表
import CardList from './page/tabPage/cardList';
// const CardList = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/tabPage/cardList').default)
//   }, 'd')
// }
// 详情页
import TabPageDetail from './page/tabPageDetail/tabPageDetail';
// const TabPageDetail = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/tabPageDetail/tabPageDetail').default)
//   }, 'e')
// }
import TabPageDetail_resee from './page/tabPageDetail/tabPageDetail_resee';
// const TabPageDetail_resee = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/tabPageDetail/tabPageDetail_resee').default)
//   }, 'f')
// }

import Order from './page/order/order';
// const Order = (location, cb) => {
//   require.ensure([], require => {
//       cb(null, require('./page/order/order').default)
//   }, 'g')
// }

// import {dva} from 'yzf-react-storage';
// import admin_models from './models/admin_models.jsx';
// import bookstores_models from './models/bookstores_models.jsx';

window.imgSrc = 'http://www.ushance.com'; // getComponent

const RouteApp = () => (<Router history={hashHistory}>
  <Redirect from="/" to="/index"/>
  {/* <Redirect from="/article" to="/article/card"/> */}
  <Route path='/' component={Menu}>
    <Route path='/index' component={Index} />
    <Route path='/TabPage/:key' component={TabPage} />
    <Route path='/CardList/:key' component={CardList} />
    <Route path='/TabPageDetail/:name' component={TabPageDetail} />
    <Route path='/TabPageDetail_resee/:name' component={TabPageDetail_resee} />
    <Route path='/Order/:name' component={Order} />
  </Route>
</Router>)

// const App = dva();
// App.model(admin_models);

ReactDOM.render(<RouteApp/>, document.getElementById('root'));

// import Loadable from 'react-loadable';
// import Loading from './my-loading-component';

// const LoadableComponent = Loadable({
//   loader: () => import('./my-component'),
//   loading: Loading,
// });

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>;
//   }
// }