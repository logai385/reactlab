import { SET_AUTHTOKEN } from "./AuthConst";

const initialState = {
  authLoading:true,
  isAuthenticated: false,
  user: null,
};
const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTHTOKEN:{
       const { isAuthenticated, user } = payload;
       return { ...state, authLoading: false, isAuthenticated, user };
    }
    default:
      return state;
  }
};

export default AuthReducer;
