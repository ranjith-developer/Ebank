import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    userPin: '',
    loginError: '',
    errorMessage: '',
  }

  handleLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  handleError = errMsg => {
    this.setState({
      loginError: true,
      errorMessage: errMsg,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userData = {user_id: userId, pin: userPin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.handleLogin(data.jwt_token)
    } else {
      this.handleError(data.error_msg)
    }
  }

  handleUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  handleUserPin = event => {
    this.setState({
      userPin: event.target.value,
    })
  }

  render() {
    const {userId, userPin, loginError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-logo"
          />
          <form className="form" onSubmit={this.handleSubmit}>
            <h1 className="heading">Welcome Back!</h1>
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              placeholder="Enter User ID"
              onChange={this.handleUserId}
              className="input"
            />
            <label htmlFor="userPin" className="label">
              PIN
            </label>
            <input
              id="userPin"
              type="password"
              value={userPin}
              onChange={this.handleUserPin}
              className="input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {loginError ? <p className="error">{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
