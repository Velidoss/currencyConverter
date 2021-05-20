import ICurrency from '../../interfaces/ICurrency';
import { AppThunk } from '../store';
import { converterApiURL, converterApiKey } from './../../config/api';
import { SET_CURRENCIES, SET_CURRENCIES_RATE, SET_EXCHANGE_RATE, SET_CONVERTER_STATUS, SET_CURRENCIES_RATE_STATUS } from './converterActionTypes';
import converterContants from './../../config/converterConstants';

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
    const response = await fetch(`${converterApiURL}currencies?apiKey=${converterApiKey}`, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    dispatch(setCurrencies(await response.json()));
    console.log('got currencies')
   }catch(error) {
    dispatch(toggleConverterState(STATUS_ERROR));
   }
  
};

export const getExchangerate = 
(currentCurrencyId: string, targetCurrencyId: string): AppThunk =>
  async (dispatch) => {
    try{
      dispatch(setCurrenciesRateStatus(STATUS_LOADING))
      const response = await fetch(
        `${converterApiURL}convert?apiKey=${converterApiKey}&q=${currentCurrencyId}_${targetCurrencyId}&compact=ultra`, 
          {
            method: 'get',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
        });
      dispatch(setExchangeRate(await response.json()));
      dispatch(setCurrenciesRateStatus(STATUS_READY));
    }catch(error) {
      dispatch(toggleConverterState(STATUS_ERROR));
    }
   
  };

export const getCurrenciesRate = 
  (currentCurrencyId: string): AppThunk =>
    async (dispatch) => {
      try{
        const urls = ['',''];
        const majorCurrencies = ['UAH', 'USD', 'EUR', 'GBP'].filter((currency) => currency !== currentCurrencyId);
        urls[0] = `${converterApiURL}convert?apiKey=${converterApiKey}&q=${majorCurrencies[0]}_${currentCurrencyId},${majorCurrencies[1]}_${currentCurrencyId}&compact=ultra`
        urls[1] = `${converterApiURL}convert?apiKey=${converterApiKey}&q=${majorCurrencies[2]}_${currentCurrencyId}${majorCurrencies[3] ? `,${majorCurrencies[3]}_${currentCurrencyId}` : ''}&compact=ultra`
        const response1 = await fetch(
          urls[0], 
          {
            method: 'get',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const response2 = await fetch(
          urls[1], 
          {
            method: 'get',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const [result1, result2] = await Promise.all([response1, response2]);
        const part1 = await result1.json();
        const part2 = await result2.json();
        dispatch(setCurrenciesRate({...part1, ...part2}));
        dispatch(toggleConverterState(STATUS_READY))
        console.log('got rates')
      }catch(error){
        dispatch(toggleConverterState(STATUS_ERROR));
      }

    };