import { message } from 'antd';
import {takeLatest, put, call, select} from 'redux-saga/effects';
import UnitService from '../../services/UnitService';
import { STATUS_CODE } from '../../ultil/systemSettings';
import { getUnitLineAct, setUnitLineAct } from './UnitAction';
import { ASSIGN_LINE, GET_UNIT_LINE } from './UnitConst';

function* getUnitLineApi(){
    try{
        const {data,status} = yield call(UnitService.getAllUnitLine);
        
        if(status === STATUS_CODE.SUCCESS){
            yield put(setUnitLineAct(data));
        }
    }catch(error){
        console.log(error);

    }
}
function* assignLineApi(action){
    try{
        const {status} = yield call(UnitService.assignLine,action.payload);
        
        if(status === STATUS_CODE.SUCCESS){
            message.success('Cập nhật Tuyến thành công');

            yield put(getUnitLineAct());
        }
    }catch(error){
        console.log(error);

    }
}
function* UnitSaga(){
    yield takeLatest(GET_UNIT_LINE,getUnitLineApi);
    yield takeLatest(ASSIGN_LINE,assignLineApi);
}
export default UnitSaga;