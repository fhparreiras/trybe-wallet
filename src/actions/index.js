// Coloque aqui suas actions
//
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: { email },
});

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';

export const addCurrency = (currency) => ({
  type: ADD_CURRENCY,
  payload: { currencies: currency },
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: { expenses: expense },
});
