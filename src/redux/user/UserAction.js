import { GET_OPERATOR, SET_OPERATOR } from "./UserConst";

export const getOperatorAct = () => ({
  type: GET_OPERATOR,
});

export const setOperatorAct = (operators) => ({
  type: SET_OPERATOR,
  payload: operators,
});
