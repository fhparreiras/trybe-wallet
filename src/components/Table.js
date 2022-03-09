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
            <th width="20%">Descrição</th>
            <th width="10%">Tag</th>
            <th width="15%">Método de pagamento</th>
            <th width="10%">Valor</th>
            <th width="5%">Moeda</th>
            <th width="7%">Câmbio utilizado</th>
            <th width="15%">Valor convertido</th>
            <th width="7%">Moeda de conversão</th>
            <th width="10%">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id,
            description,
            tag,
            method,
            // exchangeRates,
            value,
          }) => (
            // const currencyExchange = exchangeRates.currency.ask;
            <tr key={ id } className="table-body">
              <td width="20%">{ description }</td>
              <td width="10%">{ tag }</td>
              <td width="15%">{ method }</td>
              <td width="10%">{ value }</td>
              <td width="5%">{/* { exchangeRates.currency.name } */}</td>
              <td width="7%">{/* { currencyExchange } */}</td>
              <td width="15%">{/* { value * currencyExchange } */}</td>
              <td width="7%">Real</td>
              <td width="10%">
                <button type="button">Editar</button>
                <button type="button" data-testid="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
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
