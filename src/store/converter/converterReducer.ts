import { SET_EXCHANGE_RATE, SET_CURRENCIES } from "./converterActionTypes";
import convertCurrenciesToArray from '../../utils/convertCurrenciesToArray';

interface converterReducerAction {
  type: string, 
  payload: any,
}

interface converterState {
  status: string;
  exchangeRate: number;
  currencies: any;
}

const initialState: converterState = {
  status: 'loading',
  exchangeRate: 0,
  currencies: [],
}

const converterReducer = (state = initialState, {type, payload}: converterReducerAction) => {
  switch(type) {
    case SET_CURRENCIES: 
      return {...state, currencies: convertCurrenciesToArray(payload)};
    case SET_EXCHANGE_RATE:
      return {...state, exchangeRate: payload};
    default: 
      return {...state};
  }
};

export default converterReducer;