import { SET_UNIT, SET_UNIT_BUS } from "./UnitConst";

const initialState = {
  unitBuses: [],
  units:[]
};

const UnitReducer= (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_UNIT_BUS:
      return { ...state, unitBuses:payload };
    case SET_UNIT:
      return { ...state, units:payload };

    default:
      return state;
  }
};

export default UnitReducer;
