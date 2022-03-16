import {
  HIDE_MODAL,
  OPEN_FORM_EDIT,
  SET_SUBMIT_EDIT,
  SHOW_MODAL,
} from "./ModalConst";
const initialState = {
  visible: false,
  ComponentContent: "",
  callBackSubmit: () => {
    alert("click demo");
  },
};

const ModalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_MODAL:
      state.visible = true;
      return { ...state };
    case HIDE_MODAL:
      state.visible = false;
      return { ...state };
    case OPEN_FORM_EDIT:
      return { ...state, visible: true, ComponentContent: payload };
    case SET_SUBMIT_EDIT:
      return { ...state, callBackSubmit: payload };
    default:
      return state;
  }
};
export default ModalReducer;
