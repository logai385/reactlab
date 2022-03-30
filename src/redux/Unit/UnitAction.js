import { GET_UNIT_LINE, SET_UNIT_LINE,ASSIGN_LINE } from "./UnitConst";

export const getUnitLineAct=()=>({
    type:GET_UNIT_LINE,
});
export const setUnitLineAct=(unitLines)=>({
    type:SET_UNIT_LINE,
    payload: unitLines
});
export const assignLineAct=(data)=>({
    type:ASSIGN_LINE,
    payload: data
});