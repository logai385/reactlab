import { OPEN_FORM_EDIT, SET_SUBMIT_EDIT } from "./ModalConst";

export const openFormEdit = (component)=>({
    type: OPEN_FORM_EDIT,
    payload: component,
})
export const setSubmitAct=(callBackSubmit)=>({
    type: SET_SUBMIT_EDIT,
    payload: callBackSubmit,
})