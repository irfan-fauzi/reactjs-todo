import React, { Component } from 'react';

import './Register.css';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

export class Register extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRegisterSubmit = () => {

    const { email, password } = this.state;
    this.props.registerAPI({
      email,
      password
    })
    this.setState({
      email: '',
      password: ''
    })
  }

  // loading tombol / disable 

  render() {
    return (
      <div>
        <div className="auth-card">
          <p className="auth-title">Register page</p>
          <input className="input" id="email" type="text" placeholder="email" onChange={this.handleChangeText} value={this.state.email} />
          <input className="input" id="password" type="password" placeholder="pasword" onChange={this.handleChangeText} value={this.state.password} />
          <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    )
  }
}

const reduceState = (state) => (
  {
    isLoading: state.isLoading
  }
)
const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduceState, reduxDispatch)(Register);