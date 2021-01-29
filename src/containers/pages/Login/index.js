import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/atoms/Button';
import { LoginUserAPI } from '../../../config/redux/action';


export class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  // handle input untuk menghasilkan state baru,
  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }
  // setelah ini dijalankan, maka state akan punya value

  // handle login
  handleLogin = async () => {
    const { email, password } = this.state;
    const res = await this.props.loginAPI({ email, password }).catch(err => err)

    if (res) {
      console.log("login berhasil")
      this.setState({ email: '', password: '' })
    }
    else {
      console.log("login eror")
      this.setState({ email: '', password: '' })
    }
  }

  render() {
    return (
      <div>
        <div className="auth-card">
          <p className="auth-title">Login page </p>
          <input className="input" id="email" type="text" placeholder="email" onChange={this.handleChangeText} value={this.state.email} />
          <input className="input" id="password" type="password" placeholder="pasword" onChange={this.handleChangeText} value={this.state.password} />
          <Button title="login" onClick={this.handleLogin} loading={this.props.isLoading} />
        </div>
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
  loginAPI: (data) => dispatch(LoginUserAPI(data))
})

export default connect(reduceState, reduxDispatch)(Login) 
