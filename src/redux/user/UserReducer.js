import { SET_OPERATOR, SET_OPERATOR_LINE } from "./UserConst";

const initialState = {
  operators: [],
  operatorLines: [],
};

const UserReducer= (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_OPERATOR:
      return { ...state, operators: payload };
    case SET_OPERATOR_LINE:
      return { ...state, operatorLines: payload };

    default:
      return state;
  }
};
export default UserReducer;