import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletLogo from '../img/cash-flow.png';
import { categories, paymentMethods } from '../helpers/data';

class Wallet extends React.Component {
  render() {
    const { email, expenses, currencies } = this.props;

    return (
      <div className="header-master">
        <div className="container-header">
          <img src={ walletLogo } alt="Logo carteira" width="60" />
          <span className="header-title">TrybeWallet</span>
          <div className="header-data-container">
            <span className="header-email" data-testid="email-field">
              { 'Email: '}
              { email }
              { ' ' }
            </span>
            <span data-testid="total-field">
              { 'Despesa Total: R$'}
              {/* símbolo moeda */}
              { ' ' }
              { expenses.reduce((acum, curr) => (acum + curr), 0)}
              { ' ' }
            </span>
            <span data-testid="header-currency-field">
              { 'BRL'}
              { ' ' }
            </span>
          </div>
          <form className="inputs-panel">
            <label htmlFor="value-input">
              {'Valor: '}
              <input type="number" data-testid="value-input" name="value-input" />
            </label>
            <label htmlFor="currency-input">
              {'Moeda: '}
              <select data-testid="currency-input" name="currency-input">
                {currencies.map((item, id) => (
                  <option value={ item } key={ id } aria-label="currency-input">
                    { item }
                  </option>
                )) }
              </select>
            </label>
            <label htmlFor="payment-method">
              {'Método de pagamento: '}
              <select data-testid="method-input" name="payment-method">
                { paymentMethods.map((item, id) => (
                  <option value={ item } key={ id } aria-label="payment-method">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="expense-category">
              {'Categoria: '}
              <select data-testid="tag-input" name="expense-category">
                { categories.map((item, id) => (
                  <option value={ item } key={ id } aria-label="expense-category">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="expense-description">
              { 'Descrição: '}
              <input type="text" data-testid="description-input" />
            </label>
            <button type="button">Adicionar despesa</button>
          </form>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
