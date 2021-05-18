import { SET_EXCHANGE_RATE, SET_CURRENCIES, SET_CURRENCIES_RATE } from "./converterActionTypes";
import convertCurrenciesToArray from '../../utils/convertCurrenciesToArray';
import convertCurrencyRates from './../../utils/convertCurrencyRates';
import IConverterState from './../../interfaces/IConverterState';

interface converterReducerAction {
  type: string, 
  payload: any,
}

const initialState: IConverterState = {
  status: 'loading',
  exchangeRate: 0,
  currencies: [],
  currenciesRate: [],
}

const converterReducer = (state = initialState, {type, payload}: converterReducerAction) => {
  switch(type) {
    case SET_CURRENCIES: 
      return {...state, currencies: convertCurrenciesToArray(payload)};
    case SET_EXCHANGE_RATE:
      return {...state, exchangeRate: payload};
    case SET_CURRENCIES_RATE:
      return {...state, currenciesRate: convertCurrencyRates(payload)};
    default: 
      return {...state};
  }
};

export default converterReducer;