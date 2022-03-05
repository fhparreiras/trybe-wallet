import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import { saveEmail } from './actions';
import './App.css';

class App extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isButtonDisabled: true,
    isLogin: false,
  };

  handleEmailChange = (event) => {
    this.setState({
      inputEmail: event.target.value,
    }, this.handleButton);
  }

  handlePasswordChange = (event) => {
    this.setState({
      inputPassword: event.target.value,
    }, this.handleButton);
  }

  handleButton = () => {
    const { inputEmail, inputPassword } = this.state;
    const minLength = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return inputPassword.length >= minLength
    && emailRegex.test(inputEmail)
      ? this.setState({ isButtonDisabled: false })
      : this.setState({ isButtonDisabled: true });
  }

  handleClick = () => {
    const { isButtonDisabled } = this.state;
    if (!isButtonDisabled) {
      this.setState({
        isLogin: true,
        inputEmail: '',
        inputPassword: '',
      });
      const { dispatch } = this.props;
      dispatch(saveEmail(this.state));
    }
  }

  render() {
    const { inputEmail, inputPassword, isButtonDisabled, isLogin } = this.state;
    return (
      <div className="main-container">
        <Login
          inputEmail={ inputEmail }
          inputPassword={ inputPassword }
          onEmailChange={ this.handleEmailChange }
          onPasswordChange={ this.handlePasswordChange }
          isButtonDisabled={ isButtonDisabled }
          onButtonClick={ this.handleClick }
        />
        { isLogin && <Redirect to="/carteira" />}
      </div>
    );
  }
}

export default connect()(App);
