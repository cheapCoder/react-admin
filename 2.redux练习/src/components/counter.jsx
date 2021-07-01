import React, { Component } from "react"


export default class extends Component {

  increment = () => {
    // console.log(this.option.value);
    console.log(this.props);
    this.props.increment(this.option.value * 1)
  }
  decrement = () => {
    // console.log(this.option.value);
    this.props.decrement(this.option.value * 1)
  }
  incrementAsyncMethod = () => {
    // console.log(this.props.store);
    const value = this.option.value
    this.props.incrementAsync(value * 1, 1000)
  }

  render() {

    return (<div>
      <h3>共计: </h3>
      <select  ref={(option)=> this.option=option} >
        <option>1</option>
        <option>3</option>
        <option>5</option>
      </select>&emsp;
      
      <button onClick={this.increment}>+</button>&emsp;
      <button onClick={this.decrement}>-</button>&emsp;
      <button onClick={this.incrementAsyncMethod}>异步</button>&emsp;
    </div>)
  }
}