const initialState = {
  navigate: {},
};

const NavigateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_HITORY":
      return { ...state, navigate: payload };

    default:
      return state;
  }
};

export default NavigateReducer;
