// Esse reducer será responsável por tratar as informações da pessoa usuária

// export const SAVE_EMAIL = 'SAVE_EMAIL';

// export const saveEmail = (email) => ({
//   type: SAVE_EMAIL,
//   payload: { ...email },
// });
import { SAVE_EMAIL } from '../actions';

function userReducer(state = {}, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
