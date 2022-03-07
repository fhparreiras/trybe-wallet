// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCY, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCY || ADD_EXPENSE:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
