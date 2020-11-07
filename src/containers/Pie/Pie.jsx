import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'




export default class Pie extends Component {

  getOption = () => {
    return {
      title: {
        text: '用户访问来源',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  render() {
    return (
      <div id="pie" style={{ width: "70vw", height: "60vh", margin: "50px auto" }}>
        <ReactEcharts theme="heng" style={{ width: "70vw", height: "60vh" }} option={this.getOption()} />
      </div>);
  }
}