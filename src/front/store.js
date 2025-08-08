export const initialStore = () => {
  return {
    message: null,
    isAuth: false
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };


    case 'LOGIN':

      return {
        ...store,
        isAuth: true
      };

    case 'LOGOUT':

      return {
        ...store,
        isAuth: false
      };

    default:
      throw Error('Unknown action.');
  }
}

