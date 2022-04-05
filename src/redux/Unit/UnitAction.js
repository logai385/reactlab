import { GET_UNIT_BUS, SET_UNIT_BUS,ASSIGN_BUS,CREATE_UNIT, DELETE_UNIT,REMOVE_BUS } from "./UnitConst";

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