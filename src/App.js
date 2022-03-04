import React from 'react';
import Login from './components/Login';
import './App.css';

class App extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isButtonDisabled: true,
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

  render() {
    const { inputEmail, inputPassword, isButtonDisabled } = this.state;
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
      </div>
    );
  }
}

export default App;
