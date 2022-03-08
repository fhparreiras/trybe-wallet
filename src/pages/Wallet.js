import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletLogo from '../img/cash-flow.png';
import { categories, paymentMethods } from '../helpers/data';
import { addExpense } from '../actions';
import { getCurrenciesData } from '../services/currenciesAPI';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valueReal: [0],
      id: 0,
      value: 0,
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  handleBtnAdd = async () => {
    const { dispatch } = this.props;
    const { id, value, currency, method, tag, description } = this.state;
    const currenciesData = await getCurrenciesData();
    this.handleConversion(currenciesData);
    dispatch(addExpense({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currenciesData,
    }));
    this.setState({
      id: id + 1,
      value: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  handleConversion(currenciesData) {
    const { currency, value } = this.state;
    const currenciesArray = Object.entries(currenciesData);
    if (currency === 'BRL') {
      this.setState((prevState) => ({
        valueReal: [...prevState.valueReal, value],
      }));
    } else {
      console.log(currenciesArray.find((item) => (
        item[0] === currency))[1].ask);
      this.setState((prevState) => ({
        valueReal: [...prevState.valueReal, value * currenciesArray.find((item) => (
          item[0] === currency))[1].ask],
      }));
    }
  }

  render() {
    const { email, currencies } = this.props;
    const { value, valueReal } = this.state;
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
              { ' ' }
              { valueReal.length === 0 ? 0
                : valueReal.reduce((acum, curr) => (
                  parseFloat(acum) + parseFloat(curr)), 0).toFixed(2)}
              { ' ' }
            </span>
            <span data-testid="header-currency-field">
              { 'BRL'}
              { ' ' }
            </span>
          </div>
          <form className="inputs-panel">
            <label htmlFor="value">
              {'Valor: '}
              <input
                type="number"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="currency">
              {'Moeda: '}
              <select
                data-testid="currency-input"
                name="currency"
                onChange={ this.handleChange }
                id="currency"
              >
                {currencies.map((item, id) => (
                  <option value={ item } key={ id } aria-label="currency-input">
                    { item }
                  </option>
                )) }
              </select>
            </label>
            <label htmlFor="method">
              {'Método de pagamento: '}
              <select
                data-testid="method-input"
                name="method"
                id="method"
                onChange={ this.handleChange }
              >
                { paymentMethods.map((item, id) => (
                  <option value={ item } key={ id } aria-label="payment-method">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="tag">
              {'Categoria: '}
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                onChange={ this.handleChange }
              >
                { categories.map((item, id) => (
                  <option value={ item } key={ id } aria-label="expense-category">
                    { item }
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="description">
              { 'Descrição: '}
              <input
                type="text"
                data-testid="description-input"
                name="description"
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
  email: PropTypes.string.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number,
  //   value: PropTypes.string,
  //   currency: PropTypes.string,
  //   method: PropTypes.string,
  //   category: PropTypes.string,
  //   description: PropTypes.string,
  //   exchangeRates: arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
  // })).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
