import ICurrency from '../../interfaces/ICurrency';
import { AppThunk } from '../store';
import { converterApiURL, converterApiKey } from './../../config/api';
import { SET_CURRENCIES, SET_EXCHANGE_RATE } from './converterActionTypes';

const setCurrencies = (currencies: {[key: string]: ICurrency}) => ({
  type: SET_CURRENCIES,
  payload: currencies.results,
});

const setExchangeRate = (exchangeRate: number) => ({
  type: SET_EXCHANGE_RATE,
  payload: exchangeRate,
})

export const getCurrencies = 
(): AppThunk =>
 async (dispatch) => {
  const response = await fetch(`${converterApiURL}currencies?apiKey=${converterApiKey}`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  dispatch(setCurrencies(await response.json()));
};

export const getExchangerate = 
(currentCurrencyId: string, targetCurrencyId: string): AppThunk =>
  async (dispatch) => {
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
  }