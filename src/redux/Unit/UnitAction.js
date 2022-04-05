import { GET_UNIT_BUS, SET_UNIT_BUS,ASSIGN_BUS,CREATE_UNIT, DELETE_UNIT,REMOVE_BUS, GET_UNIT, SET_UNIT } from "./UnitConst";

export const getUnitBusAct=()=>({
    type:GET_UNIT_BUS,
});
export const setUnitBusAct=(unitBus)=>({
    type:SET_UNIT_BUS,
    payload: unitBus
});
export const assignBusAct=(data)=>({
    type:ASSIGN_BUS,
    payload: data
});
export const removeBusAct=(data)=>({
    type:REMOVE_BUS,
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
export const getAllUnitAct=()=>({
    type:GET_UNIT,
});
export const setUnitAct=(data)=>({
    type:SET_UNIT,
    payload: data
});