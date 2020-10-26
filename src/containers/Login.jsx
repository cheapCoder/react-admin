import React from 'react';
import { connect } from 'react-redux'
import {demo} from '../redux/actions/actiondemo';


class Login extends React.Component {

  handleButton = () => {
    console.log(this.props);
    this.props.demo(10);

    // console.log(this.props.num);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {

    return (
      <div>
        <button onClick={this.handleButton}>click it</button>
      </div>
    )
  }
};


export default connect(
  state => ({
    state: state.demo
  }),
  { demo }
)(Login)