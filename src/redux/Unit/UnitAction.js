import { GET_UNIT_LINE, SET_UNIT_LINE,ASSIGN_LINE,CREATE_UNIT, DELETE_UNIT,REMOVE_LINE } from "./UnitConst";

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
export const removeLineAct=(data)=>({
    type:REMOVE_LINE,
    payload: data
});
export const createUnitAct=(data)=>({
    type:CREATE_UNIT,
    payload: data
})
export const deleteUnitAct=(unitId)=>({
    type:DELETE_UNIT,
    payload: unitId
})