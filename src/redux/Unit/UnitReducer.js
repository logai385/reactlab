<<<<<<< HEAD
import { SET_UNIT_LINE,SET_UNIT } from "./UnitConst";

const initialState = {
  units:[],
  unitLines: [],
=======
import { SET_UNIT_BUS } from "./UnitConst";

const initialState = {
  unitBuses: [],
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc
};

const UnitReducer= (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
<<<<<<< HEAD
    case SET_UNIT_LINE:
      return { ...state, unitLines:payload };
    case SET_UNIT:
      return { ...state, units:payload };
=======
    case SET_UNIT_BUS:
      return { ...state, unitBuses:payload };
>>>>>>> 7750dc13bff97dfea17be3255b75fa74024affcc

    default:
      return state;
  }
};

export default UnitReducer;
