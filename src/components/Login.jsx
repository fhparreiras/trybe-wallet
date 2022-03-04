import React from 'react';
import PropTypes from 'prop-types';
import logo from '../img/trybeLogo.png';

export default class Login extends React.Component {
  render() {
    const { isButtonDisabled, inputEmail, inputPassword,
      onEmailChange, onPasswordChange, onButtonClick } = this.props;
    return (
      <form className="login-form">
        <img src={ logo } alt="logo-trybe" width="200" />
        <span>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="E-mail..."
              name="email"
              data-testid="email-input"
              value={ inputEmail }
              onChange={ onEmailChange }
            />
          </label>
        </span>
        <span>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Senha..."
              name="password"
              data-testid="password-input"
              value={ inputPassword }
              onChange={ onPasswordChange }
            />
          </label>
        </span>
        <button
          type="button"
          className="btn-login"
          disabled={ isButtonDisabled }
          onClick={ onButtonClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  inputEmail: PropTypes.string.isRequired,
  inputPassword: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
