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
// 下单列表
import TabPage from './page/tabPage/tabPage';
// 设备列表
import CardList from './page/tabPage/cardList';
import TabPageDetail from './page/tabPageDetail/tabPageDetail';
import TabPageDetail_resee from './page/tabPageDetail/tabPageDetail_resee';
import Order from './page/order/order';
import OrderBuy from './page/tabPageDetail/buy/index.jsx';

// 接单页面模块
import jiedanCardList from './page/jiedan/cardList';
import jiedanTabPageDetail from './page/jiedan/tabPageDetail';
import jiedanTabPageDetail_resee from './page/jiedan/tabPageDetail_resee';
import jiedantabPageDetail_tosee from './page/jiedan/tabPageDetail_tosee';

// 我的页面模块
import MyInformation from './page/myPage/personalInformation/index.jsx';
import MyAdress from './page/myPage/adress/index.jsx';
import MyOrder from './page/myPage/order/index.jsx';
import MyNoPayOrder from './page/myPage/noPayOrder/index.jsx';
import MyBillOrider from './page/myPage/billOrder/index.jsx';
import MyReceipt from './page/myPage/receipt/index.jsx';
import MyDevice from './page/myPage/device/index.jsx';
import MyInvoice from './page/myPage/invoice/index.jsx';
import Mydetail from './page/myPage/detail.jsx';
// 商城
import ShopBuildMaterial from './page/shopPage/buildMaterial/index.jsx';
import ShopBuildCardDetail from './page/shopPage/buildMaterial/cardDetail.jsx';
import ShopBuy from './page/shopPage/buy/index.jsx';
 
// import {dva} from 'yzf-react-storage';
// import admin_models from './models/admin_models.jsx';
// import bookstores_models from './models/bookstores_models.jsx';
// window.imgSrc = 'http://localhost:80';
window.imgSrc = 'https://www.ushance.com'; // getComponent https://www.ushance.com

const RouteApp = () => (<Router history={hashHistory}>
  <Redirect from="/" to="/index"/>
  {/* <Redirect from="/article" to="/article/card"/> */}
  <Route path='/' component={Menu}>
    <Route path='/index' component={Index} />
    <Route path='/TabPage/:key' component={TabPage} />
    {/* 设备共享 */}
    <Route path='/shebei/CardList/:key' component={CardList} />
    <Route path='/shebei/TabPageDetail/:name' component={TabPageDetail} />
    <Route path='/shebei/TabPageDetail_resee/:name' component={TabPageDetail_resee} />
    <Route path='/shebei/Order/:name' component={Order} />
    <Route path='/shebei/Order/buy/:id' component={OrderBuy} />
    {/* 接单模块 */}
    <Route path='/jiedan/jiedanCardList/:key' component={jiedanCardList} />
    <Route path='/jiedan/jiedanTabPageDetail/:name' component={jiedanTabPageDetail} />
    <Route path='/jiedan/jiedanTabPageDetail_resee/:name' component={jiedanTabPageDetail_resee} />
    <Route path='/jiedan/jiedantabPageDetail_tosee/:name' component={jiedantabPageDetail_tosee} />
    {/* 我的页面模块 */}
    <Route path='/MyPage/Information' component={MyInformation} />
    <Route path='/MyPage/Adress' component={MyAdress} />
    <Route path='/MyPage/Order' component={MyOrder} />
    <Route path='/MyPage/NoPayOrder' component={MyNoPayOrder} />
    <Route path='/MyPage/BillOrder' component={MyBillOrider} />
    <Route path='/MyPage/Receipt' component={MyReceipt} />
    <Route path='/MyPage/Device' component={MyDevice} />
    <Route path='/MyPage/Invoice' component={MyInvoice} />
    {/* 商城模块 */}
    <Route path='/ShopPage/BuildMaterial/CardList/:name' component={ShopBuildMaterial} />
    <Route path='/ShopPage/BuildMaterial/CardDetail/:name' component={ShopBuildCardDetail} />
    <Route path='/ShopPage/buy' component={ShopBuy} />
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