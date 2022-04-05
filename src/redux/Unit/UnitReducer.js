import { SET_UNIT_BUS } from "./UnitConst";

const initialState = {
  unitBuses: [],
};

const UnitReducer= (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_UNIT_BUS:
      return { ...state, unitBuses:payload };

    default:
      return state;
  }
};

export default UnitReducer;
