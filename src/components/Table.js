import React from 'react';
import { PropTypes, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    console.log(this.props);
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr className="table-header">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id,
            description,
            tag,
            method,
            exchangeRates,
            value,
          }) => {
            const currencyExchange = exchangeRates.currency.ask;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>
                  { tag }
                </td>
                <td>
                  { method }
                </td>
                <td>
                  { value }
                </td>
                <td>
                  { exchangeRates.currency.name }
                </td>
                <td>
                  { currencyExchange }
                </td>
                <td>
                  { value * currencyExchange }
                </td>
                <td>Real</td>
                <td>
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
    exchangeRates: arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
