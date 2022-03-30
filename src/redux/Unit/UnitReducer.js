import { SET_UNIT_LINE } from "./UnitConst";

const initialState = {
  unitLines: [],
};

const UnitReducer= (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_UNIT_LINE:
      return { ...state, unitLines:payload };

    default:
      return state;
  }
};

export default UnitReducer;
