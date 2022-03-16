import { LOGIN_API } from "./AuthConst";

export const loginUserAct = (userForm)=>({
    type:LOGIN_API,
    payload:userForm
})
