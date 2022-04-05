import { SET_UNIT_LINE,SET_UNIT } from "./UnitConst";

const initialState = {
  units:[],
  unitLines: [],
};

const UnitReducer= (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_UNIT_LINE:
      return { ...state, unitLines:payload };
    case SET_UNIT:
      return { ...state, units:payload };

    default:
      return state;
  }
};

export default UnitReducer;
