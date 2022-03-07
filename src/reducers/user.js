// Esse reducer será responsável por tratar as informações da pessoa usuária

// export const SAVE_EMAIL = 'SAVE_EMAIL';

// export const saveEmail = (email) => ({
//   type: SAVE_EMAIL,
//   payload: { ...email },
// });
import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: [],
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default user;
