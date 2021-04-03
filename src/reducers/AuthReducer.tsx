// Types
import AuthContext from '../types/AuthContext';
import Auth from '../types/Auth';

type Action =
  | { type: 'SET_AUTH', payload: Auth }
  | { type: 'REMOVE_AUTH' }

const initState: AuthContext = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
  token: {
    token: '',
    type: '',
  },
  setAuth: () => {},
  removeAuth: () => {},
};

const setAuth = (data: Auth, state: AuthContext) => {
  console.log('ok1', {data});
  localStorage.setItem('auth', JSON.stringify(data))

  return {
    ...state,
    ...data,
  };
};

const removeAuth = (state: AuthContext) => {
  localStorage.setItem('auth', JSON.stringify('auth'))

  return {
    ...state,
    ...initState
  };
};

const UserReducer = (state: AuthContext, action: Action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(action.payload, state);
    case "REMOVE_AUTH":
      return removeAuth(state);
    default:
      return state;
  }
};

export default UserReducer;