import { OPEN_FORM_EDIT } from "./ModalConst";

export const openFormEdit = (component)=>({
    type: OPEN_FORM_EDIT,
    payload: component,
})