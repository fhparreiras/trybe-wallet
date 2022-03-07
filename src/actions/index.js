// Coloque aqui suas actions
import getCurrencies from '../services/currenciesAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const getCurrenciesSuccess = (currencies) => ({
  type: GET_CURRENCIES_SUCCESS,
  payload: currencies,
});

const getCurrenciesError = (error) => ({
  type: GET_CURRENCIES_ERROR,
  payload: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const currencies = await getCurrencies();
    dispatch(getCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(getCurrenciesError(error.message));
  }
};
