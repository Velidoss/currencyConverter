import { SET_CURRENCIES } from "./converterActionTypes";
import convertCurrenciesToArray from '../../utils/convertCurrenciesToArray';

interface converterReducerAction {
  type: string, 
  payload: any,
}

interface converterState {
  status: string;
  currencies: any;
}

const initialState: converterState = {
  status: 'loading',
  currencies: [],
}

const converterReducer = (state = initialState, {type, payload}: converterReducerAction) => {
  switch(type) {
    case SET_CURRENCIES: 
      return {...state, currencies: convertCurrenciesToArray(payload)};
    default: 
      return {...state};
  }
};

export default converterReducer;