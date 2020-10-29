import React, { Component } from 'react'
import { Card } from "antd"

import "./MyContent.less"

class MyContent extends Component {
  state = {}



  render() {
    return (
        <Card 
        title="Default size card" 
        extra={<a href="#">More</a>} 
        className="content"
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>        
    );
  }
}

export default MyContent;