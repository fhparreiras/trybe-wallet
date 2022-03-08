import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletLogo from '../img/cash-flow.png';
import { categories, paymentMethods } from '../helpers/data';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: 0,
      inputCurrency: 'BRL',
      inputMethod: 'Dinheiro',
      inputCategory: 'Alimentação',
      inputDescription: '',
    };
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  handleBtnAdd = () => {
    const { dispatch } = this.props;
    dispatch(addExpense({
      ...this.state,
    }));
    this.setState({
      inputValue: 0,
      inputCurrency: 'BRL',
      inputMethod: 'Dinheiro',
      inputCategory: 'Alimentação',
      inputDescription: '',
    });
  }

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
            </span>
            <span data-testid="total-field">
              { ' Despesa Total: R$ '}
              {/* símbolo moeda */}
              { ' ' }
              { expenses.length === 0 ? 0
                : expenses.reduce((acum, curr) => (
                  acum + parseInt(curr.inputValue, 10)), 0)}
              { ' ' }
            </span>
            <span data-testid="header-currency-field">
              { 'BRL'}
              { ' ' }
            </span>
          </div>
          <form className="inputs-panel">
            <label htmlFor="inputValue">
              {'Valor: '}
              <input
                type="number"
                data-testid="value-input"
                name="inputValue"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="inputCurrency">
              {'Moeda: '}
              <select
                data-testid="currency-input"
                name="inputCurrency"
                onChange={ this.handleChange }
              >
                {currencies.map((item, id) => (
                  <option value={ item } key={ id } aria-label="currency-input">
                    { item }
                  </option>
                )) }
              </select>
            </label>
            <label htmlFor="inputMethod">
              {'Método de pagamento: '}
              <select
                data-testid="method-input"
                name="inputMethod"
                onChange={ this.handleChange }
              >
                { paymentMethods.map((item, id) => (
                  <option value={ item } key={ id } aria-label="payment-method">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="inputCategory">
              {'Categoria: '}
              <select
                data-testid="tag-input"
                name="inputCategory"
                onChange={ this.handleChange }
              >
                { categories.map((item, id) => (
                  <option value={ item } key={ id } aria-label="expense-category">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="inputDescription">
              { 'Descrição: '}
              <input
                type="text"
                data-testid="description-input"
                name="inputDescription"
                onChange={ this.handleChange }
              />
            </label>
            <button type="button" onClick={ this.handleBtnAdd }>Adicionar despesa</button>
          </form>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
