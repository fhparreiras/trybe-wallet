import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    console.log(this.props);
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr className="table-header">
            <th width="17%">Descrição</th>
            <th width="10%">Tag</th>
            <th width="14%">Método de pagamento</th>
            <th width="10%">Valor</th>
            <th width="5%">Moeda</th>
            <th width="7%">Câmbio utilizado</th>
            <th width="14%">Valor convertido</th>
            <th width="7%">Moeda de conversão</th>
            <th width="10%">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id,
            currency,
            description,
            tag,
            method,
            exchangeRates,
            value,
          }) => {
            const currencyExchange = Object.entries(exchangeRates).find((item) => (
              item[0] === currency))[1].ask;
            const currencyName = Object.entries(exchangeRates).find((item) => (
              item[0] === currency))[1].name;
            const newCurrencyName = currencyName.split('/')[0];
            return (
              <tr key={ id } className="table-body">
                <td width="17%">{ description }</td>
                <td width="10%">{ tag }</td>
                <td width="14%">{ method }</td>
                <td width="10%">{ parseFloat(value).toFixed(2) }</td>
                <td width="5%">
                  {newCurrencyName}
                </td>
                <td width="7%">
                  {parseFloat(currencyExchange).toFixed(2)}
                </td>
                <td width="14%">
                  {parseFloat(value * currencyExchange).toFixed(2)}
                </td>
                <td width="7%">Real</td>
                <td width="10%">
                  <button type="button">Editar</button>
                  <button type="button" data-testid="delete-btn">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
