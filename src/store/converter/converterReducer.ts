import { SET_EXCHANGE_RATE, SET_CURRENCIES, SET_CURRENCIES_RATE, SET_CONVERTER_STATUS, SET_CURRENCIES_RATE_STATUS } from "./converterActionTypes";
import convertCurrenciesToArray from '../../utils/convertCurrenciesToArray';
import convertCurrencyRates from './../../utils/convertCurrencyRates';
import IConverterState from './../../interfaces/IConverterState';
import converterContants from '../../config/converterConstants';

const { STATUS_LOADING } = converterContants; 

interface converterReducerAction {
  type: string, 
  payload: any,
}

const initialState: IConverterState = {
  status: STATUS_LOADING,
  currenciesRateStatus: STATUS_LOADING,
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
    case SET_CONVERTER_STATUS: 
      return {...state, status: payload};
    case SET_CURRENCIES_RATE_STATUS: 
      return {...state, currenciesRateStatus: payload};
    default: 
      return {...state};
  }
};

export default converterReducer;