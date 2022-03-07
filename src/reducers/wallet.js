// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, GET_CURRENCIES_SUCCESS, GET_CURRENCIES_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  errorMessage: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
