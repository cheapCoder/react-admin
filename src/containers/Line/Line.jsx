import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'


class Line extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventorys: [15, 30, 46, 20, 20, 40]
  }
  getOption = () => {
    const { sales, inventorys } = this.state
    return { // 配置对象
      title: {
        text: '销量折线图'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: sales
      }, {
        name: '库存',
        type: 'line',
        data: inventorys
      }]
    };
  }

  render() {
    return (
      <div>
        (<div id="line" style={{ width: "70vw", height: "60vh", margin: "50px auto" }}>
          <ReactEcharts theme="heng" style={{ width: "70vw", height: "60vh" }} option={this.getOption()} />
        </div>);

      </div>
    )
  }
}
export default Line