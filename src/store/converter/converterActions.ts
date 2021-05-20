import ICurrency from '../../interfaces/ICurrency';
import { AppThunk } from '../store';
import { SET_CURRENCIES, SET_CURRENCIES_RATE, SET_EXCHANGE_RATE, SET_CONVERTER_STATUS, SET_CURRENCIES_RATE_STATUS } from './converterActionTypes';
import converterContants from './../../config/converterConstants';
import fetchCurrencies from './../dataAccess/fetchCurrencies';
import fetchCurrenciesRate from './../dataAccess/fetchCurrenciesRate';
import fetchExchangerates from './../dataAccess/fetchExchangeRate';

const {STATUS_LOADING, STATUS_READY, STATUS_ERROR} = converterContants; 

const setCurrencies = (currencies: {[key: string]: ICurrency}) => ({
  type: SET_CURRENCIES,
  payload: currencies.results,
});

const setExchangeRate = (exchangeRate: number) => ({
  type: SET_EXCHANGE_RATE,
  payload: exchangeRate,
});

const setCurrenciesRate = (currenciesRate: any) => ({
  type: SET_CURRENCIES_RATE,
  payload: currenciesRate,
});

const setCurrenciesRateStatus = (currenciesRateStatus: string) => ({
  type: SET_CURRENCIES_RATE_STATUS,
  payload: currenciesRateStatus,
});

const toggleConverterState = (converterState: string) => ({
  type: SET_CONVERTER_STATUS,
  payload: converterState,
});

export const getCurrencies = 
(): AppThunk =>
 async (dispatch) => {
   try{
    const response = await fetchCurrencies();
    dispatch(setCurrencies(response));
   }catch(error) {
    dispatch(toggleConverterState(STATUS_ERROR));
   }
  
};

export const getExchangerate = 
(currentCurrencyId: string, targetCurrencyId: string): AppThunk =>
  async (dispatch) => {
    try{
      dispatch(setCurrenciesRateStatus(STATUS_LOADING))
      const response = await fetchExchangerates(currentCurrencyId, targetCurrencyId);
      dispatch(setExchangeRate(response));
      dispatch(setCurrenciesRateStatus(STATUS_READY));
    }catch(error) {
      dispatch(toggleConverterState(STATUS_ERROR));
    }
   
  };

export const getCurrenciesRate = 
  (currentCurrencyId: string): AppThunk =>
    async (dispatch) => {
      try{
        const response = await fetchCurrenciesRate(currentCurrencyId);
        dispatch(setCurrenciesRate(response));
        dispatch(toggleConverterState(STATUS_READY))
      }catch(error){
        dispatch(toggleConverterState(STATUS_ERROR));
      }

    };