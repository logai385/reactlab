import { SET_OPERATOR } from "./UserConst";

const initialState = {
  operators: [],
};

const UserReducer= (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_OPERATOR:
      return { ...state, operators: payload };

    default:
      return state;
  }
};
export default UserReducer;