import { GET_OPERATOR, GET_OPERATOR_LINE, SET_OPERATOR, SET_OPERATOR_LINE } from "./UserConst";

export const getOperatorAct = () => ({
  type: GET_OPERATOR,
});

export const setOperatorAct = (operators) => ({
  type: SET_OPERATOR,
  payload: operators,
});
export const getOperatorLineAct = () => ({
  type: GET_OPERATOR_LINE,
});

export const setOperatorLineAct = (operators) => ({
  type: SET_OPERATOR_LINE,
  payload: operators,
});
