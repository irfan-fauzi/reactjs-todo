import React, { Component } from 'react';

import './Register.css';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import ErrorRegister from '../../../components/atoms/ErrorRegister';

export class Register extends Component {
  state = {
    email: '',
    password: '',
    pesanError: ''
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRegisterSubmit = async () => {

    const { email, password } = this.state;
    const res = await this.props.registerAPI({
      email,
      password
    }).catch((err) => {
      // console.log(err)
      this.setState({
        pesanError: err
      })
    });
    // jika res = true maka kosongkan tetxt
    if (res) {
      this.setState({
        email: '',
        password: '',
        pesanError: ''
      })
      console.log(this.state)
    } else {
      console.log(this.state)
    }

    // jika res/hasil promise ke API gagal, maka:

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
          <ErrorRegister pesanError={this.state.pesanError}/>
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