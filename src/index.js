import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './redux/store'

import * as echarts from 'echarts';   //引入echarts主题
import { echartTheme } from './configs/index'

echarts.registerTheme("heng", echartTheme);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// // 启动热膜替换
// if(module.hot) {
//   module.hot.accept();
// }